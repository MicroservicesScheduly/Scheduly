namespace DisciplineService.Entities
{
    public class Catalog : BaseEntity
    {
        public string Name { get; set; } = String.Empty;

        public ICollection<CatalogDiscipline> CatalogDisciplines { get; set; }
    }
}
