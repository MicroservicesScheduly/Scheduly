using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DisciplineService.Migrations
{
    public partial class InitialCreateTwo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CatalogId",
                table: "Disciplines",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CatalogId",
                table: "Disciplines");
        }
    }
}
