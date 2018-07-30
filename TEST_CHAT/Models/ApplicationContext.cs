using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace TEST_CHAT.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var adminPrivs = System.Enum.GetValues(typeof(priveleges)).OfType<priveleges>().ToList();//all privs that exist
            var userPrivs = new System.Collections.Generic.List<priveleges> { priveleges.add, priveleges.list };
            modelBuilder.Entity<UserRole>()
                .HasKey(t => new { t.UserId, t.RoleId });
            modelBuilder.Entity<Role>()
                .HasData(
                new { Id = 1, Name = "admin", PrivListString = string.Join(',', adminPrivs.Select(s => s.ToString()).ToArray()) },
                new { Id = 2, Name = "user", PrivListString = string.Join(',', userPrivs.Select(s => s.ToString()).ToArray()) }
                );
            modelBuilder.Entity<User>()
                .HasData(
                new { Id = 1, Email = "admin", Password = "password", Name = "Администратор", WasActive = (long) 0 }
                );
            modelBuilder.Entity<UserRole>()
                .HasData(
                new { UserId = 1, RoleId = 1 }
                );

        }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
