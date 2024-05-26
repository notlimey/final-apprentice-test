import { fetchApi } from '@/common/lib/api';
import type { Review } from '@/common/types/reviews.types';
import ReviewListItem from './ReviewListItem';

const getReviews = async (restaurantId: string) => {
	const reviews = await fetchApi<Review[]>(`Reviews/Restaurant/${restaurantId}`);

	return reviews?.data;
};

export default async function ReviewList({ restaurantId }: { restaurantId: string }) {
	const reviews = await getReviews(restaurantId);

	if (!reviews) {
		return <p>No reviews found</p>;
	}

	return (
		<>
			{reviews.map((review) => (
				<ReviewListItem review={review} key={review.id} />
			))}
		</>
	);
}
