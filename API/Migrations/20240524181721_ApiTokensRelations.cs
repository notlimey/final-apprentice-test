using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ApiTokensRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApiTokens_AspNetUsers_UserId1",
                table: "ApiTokens");

            migrationBuilder.DropIndex(
                name: "IX_ApiTokens_UserId1",
                table: "ApiTokens");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "ApiTokens");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ApiTokens",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_ApiTokens_UserId",
                table: "ApiTokens",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApiTokens_AspNetUsers_UserId",
                table: "ApiTokens",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApiTokens_AspNetUsers_UserId",
                table: "ApiTokens");

            migrationBuilder.DropIndex(
                name: "IX_ApiTokens_UserId",
                table: "ApiTokens");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "ApiTokens",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "ApiTokens",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApiTokens_UserId1",
                table: "ApiTokens",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ApiTokens_AspNetUsers_UserId1",
                table: "ApiTokens",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
