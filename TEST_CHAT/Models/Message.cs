using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TEST_CHAT.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public string Text { get; set; }

        public long Time { get; set; }

    }
}
