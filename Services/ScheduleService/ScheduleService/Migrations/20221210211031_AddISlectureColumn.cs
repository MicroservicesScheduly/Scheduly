using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScheduleService.Migrations
{
    /// <inheritdoc />
    public partial class AddISlectureColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLecture",
                table: "ScheduleDisciplines",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLecture",
                table: "ScheduleDisciplines");
        }
    }
}
