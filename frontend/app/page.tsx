import Rating from '@/common/components/inputs/RatingComponent';
import { BASE_URL } from '@/common/lib/constants/api';
import { getCurrentSession, getCurrentUser } from '@/common/lib/session';
import HomeView from '@/common/lib/pages/home/home-view';
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

	return <HomeView initial={data} />;
}
