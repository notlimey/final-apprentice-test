using API.Models;

namespace API.Extensions.Restaurant;

public static partial class RestaurantRatingExtension
{
    public static Models.Restaurant AddRating(this Models.Restaurant restaurant, Review review, int numberOfReviews)
    {
        restaurant.AverageFoodQualityRating = CalculateNewRating(restaurant.AverageFoodQualityRating, numberOfReviews, review.FoodQualityRating);
        restaurant.AverageServiceQualityRating = CalculateNewRating(restaurant.AverageServiceQualityRating, numberOfReviews, review.ServiceQualityRating);
        restaurant.AverageAmbianceRating = CalculateNewRating(restaurant.AverageAmbianceRating, numberOfReviews, review.AmbianceRating);
        restaurant.AverageValueForMoneyRating = CalculateNewRating(restaurant.AverageValueForMoneyRating, numberOfReviews, review.ValueForMoneyRating);
        restaurant.AverageOverallRating = CalculateNewRating(restaurant.AverageOverallRating, numberOfReviews, review.OverallRating);
        return restaurant;
    }

    private static double CalculateNewRating(double currentRating, int numberOfReviews, double newRating)
    {
        return ((currentRating * numberOfReviews) + newRating) / (numberOfReviews + 1);
    }
}