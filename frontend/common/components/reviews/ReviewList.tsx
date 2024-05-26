import { fetchApi } from '@/common/lib/api';
import type { Review } from '@/common/types/reviews.types';
import ReviewListItem from './ReviewListItem';
import { Card, CardHeader } from '../ui/card';
import CreateNewReviewCard from './CreateNewReviewCard';

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
			<div className='py-6'>
				<CreateNewReviewCard restaurantId={restaurantId} />
				{reviews.map((review) => (
					<ReviewListItem review={review} key={review.id} />
				))}
			</div>
		</>
	);
}
