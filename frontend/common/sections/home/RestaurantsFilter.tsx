'use client';

import type { Restaurant } from '@/common/types/restaurants.types';

export default function RestaurantsFilter({ restaurants }: { restaurants: Restaurant[] }) {
	return (
		<div className='w-[240px]'>
			<div>
				<p>Anmeldelser</p>
			</div>
		</div>
	);
}
