namespace DisciplineService.Entities
{
    public class Group : BaseEntity
    {
        public string Cipher { get; set; } = String.Empty;
        public int Course { get; set; }
        public int FacultyId { get; set; }
        public int SpecialtyId { get; set; }

    }
}
