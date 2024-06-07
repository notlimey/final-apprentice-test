import ReviewList from '@/common/components/reviews/ReviewList';
import { fetchApi } from '@/common/lib/api';
import RestaurantView from '@/common/lib/pages/restaurant/restaruant-view';
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
		<>
			<RestaurantView {...restaurant} />
			<Suspense fallback={<div className='flex justify-center items-center py-4 w-full'>Loading...</div>}>
				<ReviewList restaurantId={restaurant.id} />
			</Suspense>
		</>
	);
}
