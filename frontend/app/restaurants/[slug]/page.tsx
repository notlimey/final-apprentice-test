import { BASE_URL } from '@/common/lib/constants/api';
import type { Restaurant } from '@/common/types/restaurants.types';
import axios from 'axios';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		slug: string;
	};
};

const getRestaurant = async (slug: string) => {
	const restaurant = await axios.get<Restaurant>(`${BASE_URL}Restaurants/${slug}`).catch(() => null);

	return restaurant?.data;
};

export default async function RestaurantsPage(props: Props) {
	const restaurant = await getRestaurant(props.params.slug);

	if (!restaurant) {
		return notFound();
	}

	return (
		<>
			<div className='max-w-[1240px] px-5 mx-auto py-12'>
				<h1 className='font-bold text-4xl md:text-5xl'>{restaurant.name}</h1>
				<p className='mt-3 text-lg'>{restaurant.description}</p>
				<div className='mt-5'>
					<img
						src={restaurant.imageUrl}
						alt={restaurant.name}
						className='w-full aspect-w-16 aspect-h-9 object-cover'
					/>
				</div>
			</div>
		</>
	);
}
