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
    
    public static Models.Restaurant RemoveRating(this Models.Restaurant restaurant, Review review, int numberOfReviews)
    {
        if (numberOfReviews <= 1)
        {
            restaurant.AverageFoodQualityRating = 0;
            restaurant.AverageServiceQualityRating = 0;
            restaurant.AverageAmbianceRating = 0;
            restaurant.AverageValueForMoneyRating = 0;
            restaurant.AverageOverallRating = 0;
        }
        else
        {
            restaurant.AverageFoodQualityRating = CalculateNewRatingOnRemove(restaurant.AverageFoodQualityRating, numberOfReviews, review.FoodQualityRating);
            restaurant.AverageServiceQualityRating = CalculateNewRatingOnRemove(restaurant.AverageServiceQualityRating, numberOfReviews, review.ServiceQualityRating);
            restaurant.AverageAmbianceRating = CalculateNewRatingOnRemove(restaurant.AverageAmbianceRating, numberOfReviews, review.AmbianceRating);
            restaurant.AverageValueForMoneyRating = CalculateNewRatingOnRemove(restaurant.AverageValueForMoneyRating, numberOfReviews, review.ValueForMoneyRating);
            restaurant.AverageOverallRating = CalculateNewRatingOnRemove(restaurant.AverageOverallRating, numberOfReviews, review.OverallRating);
        }

        return restaurant;
    }

    private static double CalculateNewRating(double currentRating, int numberOfReviews, double newRating)
    {
        return ((currentRating * numberOfReviews) + newRating) / (numberOfReviews + 1);
    }

    private static double CalculateNewRatingOnRemove(double currentRating, int numberOfReviews, double oldRating)
    {
        return ((currentRating * numberOfReviews) - oldRating) / (numberOfReviews - 1);
    }
}