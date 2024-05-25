using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RatingStyleAndAverageRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AverageAmbianceRating",
                table: "Restaurants",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageFoodQualityRating",
                table: "Restaurants",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageOverallRating",
                table: "Restaurants",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageServiceQualityRating",
                table: "Restaurants",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageValueForMoneyRating",
                table: "Restaurants",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "RatingStyle",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageAmbianceRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "AverageFoodQualityRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "AverageOverallRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "AverageServiceQualityRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "AverageValueForMoneyRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "RatingStyle",
                table: "AspNetUsers");
        }
    }
}
