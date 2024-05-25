using API.DTOS.Review;
using API.Models;
using Riok.Mapperly.Abstractions;

namespace API.Mappings.Reviews;

[Mapper]
public static partial class ReviewMapper
{
    public static partial ReviewDto ToDto(this Review review);

    public static partial List<ReviewDto> ToDtos(this List<Review> reviews);
}