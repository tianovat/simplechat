using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEST_CHAT.Models;

namespace TEST_CHAT.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly ApplicationContext _context;

        public UserController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<User> GetActiveUsers()
        {
            return _context.Users.Where(u=> (DateTimeOffset.UtcNow.ToUnixTimeSeconds() - u.WasActive)<300).Select(u=>new User {Name = u.Name });
        }

        [HttpGet("Current", Name = "GetCurrentUser")]
        public async Task<IActionResult> GetUser()
        {

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == User.Identity.Name);

            if (user == null)
            {
                return Ok(new User());
            }
            user.Password = "";
            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        [AuthorizePolicy(priveleges.accAdmin)]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User userToSave;
            Role userRole = null;
            if (user.Id < 1)
            {
                userToSave = new User();
                userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "user");
            }
            else {
                userToSave = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            }
            userToSave.Name = user.Name;
            userToSave.Email = user.Email;
            userToSave.Password = user.Password;
            userToSave.WasActive = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            if (user.Id < 1)
            {
                _context.Users.Add(userToSave);
            }
            else
            {
                _context.Users.Update(userToSave);
            }
            await _context.SaveChangesAsync();
            if (userRole != null) {
                var ur = new UserRole {UserId = userToSave.Id, RoleId = userRole.Id };
                _context.UserRoles.Add(ur);
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        [AuthorizePolicy(priveleges.accAdmin)]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}