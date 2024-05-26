import ReviewList from '@/common/components/reviews/ReviewList';
import type { Restaurant } from '@/common/types/restaurants.types';
import { Suspense } from 'react';
import { Apple, Coins, Drama, HandPlatter, Star } from 'lucide-react';

export default function RestaurantView(restaurant: Restaurant) {
	return (
		<div className='mt-5 relative shadow-md rounded-md overflow-hidden'>
			<img
				src={restaurant.imageUrl}
				alt={restaurant.name}
				className='w-full aspect-[16/9] rounded-md object-cover '
			/>
			<div className='flex flex-col absolute bottom-0 w-full'>
				<div className='relative w-full'>
					<div className='-top-6 h-20 w-full bg-gradient-to-b from-transparent to-white/80' />
				</div>
				<div className='py-4 bg-white/80 px-5'>
					<h1 className='font-bold text-4xl md:text-5xl'>{restaurant.name}</h1>
					<p className='mt-3 text-lg'>{restaurant.description}</p>
				</div>
			</div>
			<div className='absolute z-10 py-3 px-5 top-4 right-4 bg-white rounded-full'>
				<div className='flex items-center gap-5 justify-center'>
					<div className='flex flex-col items-center justify-center'>
						<Apple className='size-5' />
						<span className='text-sm'>{restaurant.averageFoodQualityRating?.toFixed(1)}</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<HandPlatter className='size-5' />
						<span className='text-sm'>{restaurant.averageServiceQualityRating?.toFixed(1)}</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<Drama className='size-5' />
						<span className='text-sm'>{restaurant.averageAmbianceRating?.toFixed(1)}</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<Coins className='size-5' />
						<span className='text-sm'>{restaurant.averageValueForMoneyRating?.toFixed(1)}</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<Star className='size-5' />
						<span className='text-sm'>{restaurant.averageOverallRating?.toFixed(1)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
