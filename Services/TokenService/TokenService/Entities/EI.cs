namespace TokenService.Entities
{
    public class EI : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<UserEI> UserEIs { get; set; }
    }
}
