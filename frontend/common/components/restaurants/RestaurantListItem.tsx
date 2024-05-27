import type { Restaurant } from '@/common/types/restaurants.types';
import Image from 'next/image';
import Rating from '../inputs/RatingComponent';
import { Clock, MapPin, MessageSquare, PiggyBank, Pin } from 'lucide-react';
import Link from 'next/link';

const RestaurantListItem = ({ restaurant }: { restaurant: Restaurant }) => {
	return (
		<Link href={`/restaurants/${restaurant.slug}`} className='grid group grid-cols-1 lg:grid-cols-2 gap-[36px]'>
			<div className='w-full'>
				<img
					className='object-cover w-full h-[300px]'
					src={restaurant.imageUrl ?? '/public/spearribs.jpeg'}
					alt={restaurant.name}
				/>
			</div>
			<div className='flex flex-col gap-y-[12px] transition-colors'>
				<div className='flex flex-col gap-[4px]'>
					<h3 className='text-2xl group-hover:underline font-semibold'>{restaurant.name}</h3>
					<Rating value={restaurant.averageOverallRating ?? 0} numberOfRatings={2} />
				</div>
				<div className='flex flex-col gap-[8px]'>
					<p className='inline-flex gap-1 items-center'>
						<MapPin className='size-6' />
						200 meter unna
					</p>
					<p className='inline-flex gap-1 items-center'>
						<Clock className='size-6' />
						12:00 - 22:00
					</p>
					<p className='inline-flex gap-1 items-center'>
						<PiggyBank className='size-6' />
						Rimelig
					</p>
				</div>
				<div className='flex gap-3 items-start border-t pt-4'>
					<div className='py-1'>
						<MessageSquare className='size-6' />
					</div>
					<p>“Nydelig mat og storslåtte lokaler - bedre enn dette blir det ikke!”</p>
				</div>
			</div>
		</Link>
	);
};

export default RestaurantListItem;
