import Rating from '@/common/components/inputs/RatingComponent';
import { BASE_URL } from '@/common/lib/constants/api';
import { getCurrentSession, getCurrentUser } from '@/common/lib/session';
import type { Restaurant } from '@/common/types/restaurants.types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const getRestaurants = async () => {
	const restaurants = await axios.get<Restaurant[]>(`${BASE_URL}Restaurants`).catch(() => ({
		data: [],
	}));

	return restaurants.data;
};

export default async function Home() {
	const data = await getRestaurants();

	return (
		<>
			<div className='max-w-[1240px] px-5 mx-auto py-12'>
				<h1 className='font-bold text-4xl md:text-5xl'>Innlandet mat</h1>
				<p className='mt-3 text-lg'>En oversikt over restauranter og spisesteder i Innlandet fylke.</p>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>
					{data.map((restaurant) => (
						<Link
							key={restaurant.id}
							href={`/restaurants/${restaurant.slug}`}
							className='bg-white w-full gap-y-3 rounded-md overflow-hidden shadow-md'
						>
							<img
								src={restaurant.imageUrl}
								alt={restaurant.name}
								className=' w-full aspect-video object-cover object-top'
							/>
							<div className='px-5 py-3'>
								<h2 className='font-bold text-xl'>{restaurant.name}</h2>
								<p>{restaurant.description}</p>
								<div className='flex justify-end mt-4'>
									<Rating value={restaurant.averageOverallRating} hoverDisabled />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
