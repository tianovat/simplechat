using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TEST_CHAT.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public long WasActive { get; set; }
        public ICollection<UserRole> UserRole { get; } = new List<UserRole>();
    }
}
