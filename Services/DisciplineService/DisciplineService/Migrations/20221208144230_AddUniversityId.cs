using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DisciplineService.Migrations
{
    public partial class AddUniversityId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Disciplines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Catalogs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Disciplines");

            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Catalogs");
        }
    }
}
