using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeacherService.Migrations
{
    public partial class Changes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DisciplineTeachers_TeacherId",
                table: "DisciplineTeachers",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_DisciplineTeachers_Teachers_TeacherId",
                table: "DisciplineTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DisciplineTeachers_Teachers_TeacherId",
                table: "DisciplineTeachers");

            migrationBuilder.DropIndex(
                name: "IX_DisciplineTeachers_TeacherId",
                table: "DisciplineTeachers");
        }
    }
}
