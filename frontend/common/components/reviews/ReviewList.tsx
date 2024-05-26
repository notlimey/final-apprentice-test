import { fetchApi } from '@/common/lib/api';
import type { Review } from '@/common/types/reviews.types';
import ReviewListItem from './ReviewListItem';
import { Card, CardHeader } from '../ui/card';
import CreateNewReviewCard from './CreateNewReviewCard';

const getReviews = async (restaurantId: string) => {
	const reviews = await fetchApi<Review[]>(`Reviews/Restaurant/${restaurantId}`);
	const personal = await fetchApi<Review>(`Reviews/Personal/${restaurantId}`);

	return [reviews?.data, personal?.data as null | Review] as const;
};

export default async function ReviewList({ restaurantId }: { restaurantId: string }) {
	const [reviews, personal] = await getReviews(restaurantId);

	if (!reviews) {
		return <p>No reviews found</p>;
	}

	return (
		<>
			<div className='py-6'>
				<CreateNewReviewCard restaurantId={restaurantId} personal={personal} />
				{personal && <ReviewListItem review={personal} />}
				{reviews
					.filter((x) => x.id !== personal?.id)
					.map((review) => (
						<ReviewListItem review={review} key={review.id} />
					))}
			</div>
		</>
	);
}
