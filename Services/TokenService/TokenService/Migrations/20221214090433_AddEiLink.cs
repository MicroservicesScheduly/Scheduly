using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TokenService.Migrations
{
    public partial class AddEiLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "EIs",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Link",
                table: "EIs");
        }
    }
}
