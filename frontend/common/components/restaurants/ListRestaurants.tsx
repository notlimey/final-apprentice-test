'use client';

import type { Restaurant } from '@/common/types/restaurants.types';
import RestaurantListItem from './RestaurantListItem';

export default function ListRestaurants({ restaurants }: { restaurants: Restaurant[] }) {
	return (
		<>
			<div className='flex flex-col gap-[24px]'>
				{restaurants.map((restaurant) => (
					<RestaurantListItem key={restaurant.id} restaurant={restaurant} />
				))}
			</div>
		</>
	);
}
