using API.DTOS.Restaurants;
using Riok.Mapperly.Abstractions;

namespace API.Mappings.Restaurant;

[Mapper]
public static partial class RestaurantMapper
{
    public static partial RestaurantDto ToDto(this Models.Restaurant restaurant);
    
    public static partial List<RestaurantDto> ToDtos(this List<Models.Restaurant> restaurants);
}