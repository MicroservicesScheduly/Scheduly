using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Emailer.Migrations
{
    /// <inheritdoc />
    public partial class AddSemesterColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Semester",
                table: "EmailSubscriptions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Semester",
                table: "EmailSubscriptions");
        }
    }
}
