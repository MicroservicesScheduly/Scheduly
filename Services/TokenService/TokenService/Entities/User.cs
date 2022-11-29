using Microsoft.Extensions.Hosting;

namespace TokenService.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public DateTime RegistrationTime { get; set; } = DateTime.Now;
        public int CredentialsId { get; set; }
        public Credentials Credentials { get; set; }
        public int UniversityId { get; set; }
    }
}
