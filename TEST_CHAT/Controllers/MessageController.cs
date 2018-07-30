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
    public class OnlyMessageText
    {
        public string Text { get; set; }
    }
    [Produces("application/json")]
    [Route("api/Message")]
    public class MessageController : Controller
    {
        private readonly ApplicationContext _context;

        public MessageController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Message
        [HttpGet]
        [AuthorizePolicy(priveleges.list)]
        public async Task<IActionResult> GetMessages()
        {
            var author = await _context.Users.SingleOrDefaultAsync(u => u.Email == User.Identity.Name);
            author.WasActive = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            await _context.SaveChangesAsync();
            return Ok(_context.Messages.OrderByDescending(m=>m.Id).Take(100));
        }

        [HttpGet("FromId/{id}", Name = "GetMassgesFromId")]
        [AuthorizePolicy(priveleges.list)]
        public async Task<IActionResult> GetMessagesFromId(int id)
        {
            await _context.SaveChangesAsync();
            return Ok(_context.Messages.Where(m=>m.Id>id).OrderByDescending(m => m.Id).Take(100));
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = await _context.Messages.SingleOrDefaultAsync(m => m.Id == id);

            if (message == null)
            {
                return NotFound();
            }

            return Ok(message);
        }

        // PUT: api/Message/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage([FromRoute] int id, [FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != message.Id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
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

        // POST: api/Message
        [HttpPost]
        [AuthorizePolicy(priveleges.add)]
        public async Task<IActionResult> PostMessage([FromBody] OnlyMessageText messageText)
        {
            var message = new Message();
            var author = await _context.Users.SingleOrDefaultAsync(u => u.Email == User.Identity.Name);
            author.WasActive = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            message.Text = messageText.Text;
            message.Author = author.Name;
            message.Time = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        // DELETE: api/Message/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = await _context.Messages.SingleOrDefaultAsync(m => m.Id == id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        private bool MessageExists(int id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}