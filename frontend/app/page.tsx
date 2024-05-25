import { BASE_URL } from '@/common/lib/constants/api';
import { getCurrentSession, getCurrentUser } from '@/common/lib/session';
import type { Restaurant } from '@/common/types/restaurants.types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const getRestaurants = async () => {
	const restaurants = await axios.get<Restaurant[]>(`${BASE_URL}Restaurants`);

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
							href={`/restaurant/${restaurant.slug}`}
							className='bg-white w-full gap-y-3 rounded-md overflow-hidden'
						>
							<img
								src={restaurant.imageUrl}
								alt={restaurant.name}
								className=' w-fullaspect-video object-cover'
							/>
							<div className='px-5 py-3'>
								<h2 className='font-bold text-xl'>{restaurant.name}</h2>
								<p>{restaurant.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
