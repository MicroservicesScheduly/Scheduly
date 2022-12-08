using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpecialtyService.Migrations
{
    /// <inheritdoc />
    public partial class AddUniversityId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Specialties",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Specialties");
        }
    }
}
