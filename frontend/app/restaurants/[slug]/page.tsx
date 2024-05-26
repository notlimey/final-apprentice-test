import ReviewList from '@/common/components/reviews/ReviewList';
import { fetchApi } from '@/common/lib/api';
import RestaurantView from '@/common/pages/restaurant/restaruant-view';
import type { Restaurant } from '@/common/types/restaurants.types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
	params: {
		slug: string;
	};
};

const getRestaurant = async (slug: string) => {
	const restaurant = await fetchApi<Restaurant>(`Restaurants/${slug}`).catch(() => null);

	return restaurant?.data;
};

export default async function RestaurantsPage(props: Props) {
	const restaurant = await getRestaurant(props.params.slug);

	if (!restaurant) return notFound();

	return (
		<div className='max-w-[1240px] px-5 mx-auto py-12'>
			<RestaurantView {...restaurant} />
			<Suspense fallback={<div>Loading...</div>}>
				<ReviewList restaurantId={restaurant.id} />
			</Suspense>
		</div>
	);
}
