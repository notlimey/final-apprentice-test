import Rating from '@/common/components/inputs/RatingComponent';
import RestaurantMap from '@/common/components/maps/RestaurantMap';
import HeroSection from '@/common/sections/home/HeroSection';
import type { Restaurant } from '@/common/types/restaurants.types';
import { Clock, Home, Mail, MapPin, Phone, PiggyBank, Utensils } from 'lucide-react';
import Link from 'next/link';

const days = {
	0: 'sunday',
	1: 'monday',
	2: 'tuesday',
	3: 'wednesday',
	4: 'thursday',
	5: 'friday',
	6: 'saturday',
};

const EXPENSE_LEVEL = ['Veldig dyrt', 'Dyrt', 'Rimelig', 'Billig', 'Veldig billig'];

export default function RestaurantView(restaurant: Restaurant) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const day = (days as any)[new Date().getDay()];
	const openingHoursToday = restaurant.openingHours[day as keyof typeof restaurant.openingHours];
	const avgRoundedValueForMoneyRating = Math.round(restaurant.averageValueForMoneyRating ?? 0);

	const websiteReadable = new URL(restaurant.website ?? '').host;

	return (
		<div className='max-w-[1240px] px-5 mx-auto flex flex-col gap-y-[12px]'>
			<HeroSection
				title={restaurant.name}
				subtitle={restaurant.description}
				img={{
					src: restaurant.imageUrl,
					alt: restaurant.name,
				}}
			/>
			<div className='py-[36px] px-[24px] grid grid-cols-1 md:grid-cols-4 bg-secondary'>
				<div className='flex justify-center items-center gap-1.5'>
					<MapPin className='size-6' />
					<p>200 meter unna</p>
				</div>
				<div className='flex justify-center items-center gap-1.5'>
					<Clock className='size-6' />
					<p>
						{openingHoursToday?.opensAt.slice(0, 5)} - {openingHoursToday?.closesAt.slice(0, 5)}
					</p>
				</div>
				<div className='flex justify-center items-center gap-1.5'>
					<Utensils className='size-6' />
					<p>Moderne, lokalt</p>
				</div>
				<div className='flex justify-center items-center gap-1.5'>
					<PiggyBank className='size-6' />
					<p>
						{restaurant.averageValueForMoneyRating > 0 ? EXPENSE_LEVEL[avgRoundedValueForMoneyRating] : '-'}
					</p>
				</div>
			</div>

			<div className='gap-x-[12px] grid grid-cols-1 md:grid-cols-2 min-h-[300px] items-stretch'>
				<div className=' bg-card p-[48px] flex flex-col justify-center items-start self-stretch gap-y-[12px]'>
					<div className='flex items-center gap-2 w-full'>
						<Home className='size-6' />
						{restaurant.website ? (
							<Link className='underline' href={restaurant.website}>
								{websiteReadable}
							</Link>
						) : (
							<p>Ingen nettside</p>
						)}
					</div>
					<div className='flex items-center gap-2 w-full'>
						<Phone className='size-6' />
						{restaurant.phoneNumber ? (
							<Link className='underline' href={`tlf:${restaurant.phoneNumber}`}>
								{websiteReadable}
							</Link>
						) : (
							<p>Ingen telefonnummer tilgjengelig</p>
						)}
					</div>
					<div className='flex items-center gap-2 w-full'>
						<MapPin className='size-6' />
						<p>{restaurant.address}</p>
					</div>
				</div>
				<div className='h-full self-stretch'>
					<RestaurantMap {...restaurant} />
				</div>
			</div>
			<div className='pt-12'>
				<h2 className='text-[36px] leading-[44px]'>Anmeldelser</h2>
				<div className='flex flex-wrap md:flex-nowrap gap-x-[60px] mt-5'>
					<div className='flex flex-col gap-y-1'>
						<h3 className='text-[24px]'>Totalvurdering: {restaurant.averageOverallRating}</h3>
						<Rating value={restaurant.averageOverallRating} />
						<p>
							{restaurant.numberOfReviews} {restaurant.numberOfReviews > 1 ? 'anmeldelser' : 'anmeldelse'}
						</p>
					</div>
					<div className='grid grid-cols-2 gap-x-4 gap-y-1'>
						<p>Matkvalitet</p>
						<Rating value={restaurant.averageFoodQualityRating} size={24} hoverDisabled />
						<p>Servicekvalitet</p>
						<Rating value={restaurant.averageServiceQualityRating} size={24} hoverDisabled />
						<p>Stemning</p>
						<Rating value={restaurant.averageAmbianceRating} size={24} hoverDisabled />
						<p>Valuta for pengene</p>
						<Rating value={restaurant.averageValueForMoneyRating} size={24} hoverDisabled />
					</div>
				</div>
			</div>
		</div>
	);
}
