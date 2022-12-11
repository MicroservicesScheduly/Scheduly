using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScheduleService.Migrations
{
    /// <inheritdoc />
    public partial class AddDisciplineNameAndIsSelective : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisciplineName",
                table: "ScheduleDisciplines",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isSelecive",
                table: "ScheduleDisciplines",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisciplineName",
                table: "ScheduleDisciplines");

            migrationBuilder.DropColumn(
                name: "isSelecive",
                table: "ScheduleDisciplines");
        }
    }
}
