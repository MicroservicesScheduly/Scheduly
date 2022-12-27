using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TokenService.Migrations
{
    public partial class AddIsAnsweredToUserEIModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAnswered",
                table: "UserEIs",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAnswered",
                table: "UserEIs");
        }
    }
}
