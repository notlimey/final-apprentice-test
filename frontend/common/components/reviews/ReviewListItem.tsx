'use client';

import type { Review as ReviewType } from '@/common/types/reviews.types';
import { Apple, Coins, Drama, HandPlatter, Star } from 'lucide-react';

const ReviewListItem = (review: ReviewType) => (
	<div key={review.id} className='bg-white p-5 rounded-md shadow-md mt-5'>
		<div className='flex justify-between'>
			<div className='w-full'>
				<div className='flex justify-between items-center'>
					<h2 className='font-bold text-xl'>{review.title}</h2>
					<p className='text-sm text-gray-500 mt-1'>
						Besøksdato: {new Date(review.dateVisited).toLocaleDateString()}
					</p>
				</div>
				<p className='mt-3'>{review.comment}</p>
			</div>
		</div>
		{review.user && (
			<>
				<div className='w-full h-0.5 border-b-gray-300 border-b my-3' />
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<img
							src={review.user?.avatarUrl ?? ''}
							alt={review.user?.userName ?? ''}
							className='size-12 rounded-full'
						/>
						<div>
							<p className='font-medium text-sm'>
								{review.user?.firstName} {review.user.lastName}
							</p>
							<p className='text-sm'>{review.user?.userName}</p>
						</div>
					</div>
					<div className='flex items-center gap-4 justify-center'>
						<div className='flex flex-col items-center justify-center'>
							<Apple className='size-5' />
							<span className='text-sm'>{review.foodQualityRating}</span>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<HandPlatter className='size-5' />
							<span className='text-sm'>{review.serviceQualityRating}</span>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Drama className='size-5' />
							<span className='text-sm'>{review.ambianceRating}</span>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Coins className='size-5' />
							<span className='text-sm'>{review.valueForMoneyRating}</span>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Star className='size-5' />
							<span className='text-sm'>{review.overallRating}</span>
						</div>
					</div>
				</div>
			</>
		)}
	</div>
);

export default ReviewListItem;
