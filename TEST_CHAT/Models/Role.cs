using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TEST_CHAT.Models
{
    public enum priveleges {read, write, list, print, delete, add, roleAdmin, accAdmin};
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserRole> UserRole { get; } = new List<UserRole>();
        public string PrivListString { get; set; }
        [NotMapped]
        public List<priveleges> Priveleges {
            get {
                return PrivListString == null?
                    new List<priveleges>():
                    PrivListString.Split(',', StringSplitOptions.RemoveEmptyEntries).
                    Select(p => 
                    (priveleges)Enum.Parse(typeof(priveleges), p)).ToList();
            }
            set {
                PrivListString = string.Join(',', value);
            }
        }
        
    }
}
