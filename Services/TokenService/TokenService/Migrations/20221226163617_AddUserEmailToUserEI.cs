using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TokenService.Migrations
{
    public partial class AddUserEmailToUserEI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "userEmailWhoSendInvite",
                table: "UserEIs",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userEmailWhoSendInvite",
                table: "UserEIs");
        }
    }
}
