using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeacherService.Migrations
{
    public partial class AddUniversityId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Teachers",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Teachers");
        }
    }
}
