import type { Restaurant } from '@/common/types/restaurants.types';
import RestaurantsFilter from './RestaurantsFilter';
import ListRestaurants from '@/common/components/restaurants/ListRestaurants';

export default function RestaurantResultsSection({ initial }: { initial: Restaurant[] }) {
	return (
		<div className='flex gap-[36px] py-10'>
			{/* <RestaurantsFilter restaurants={initial} /> */}
			<div>
				<ListRestaurants restaurants={initial} />
			</div>
		</div>
	);
}
