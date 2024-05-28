import { fetchApi } from '@/common/lib/api';
import type { Review } from '@/common/types/reviews.types';
import ReviewListItem from './ReviewListItem';

const getReviews = async (restaurantId: string) => {
	const reviews = await fetchApi<Review[]>(`Reviews/Restaurant/${restaurantId}`).catch(() => ({ data: [] }));
	const personal = await fetchApi<Review>(`Reviews/Personal/${restaurantId}`).catch(() => null);

	return [reviews?.data, personal?.data as null | Review] as const;
};

export default async function ReviewList({ restaurantId }: { restaurantId: string }) {
	const [reviews, personal] = await getReviews(restaurantId);

	if (!reviews) {
		return <p>No reviews found</p>;
	}

	return (
		<>
			<div className='max-w-[1240px] px-5 mx-auto  py-12 flex flex-col gap-y-5'>
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
