'use client';

import { deleteReview } from '@/common/lib/reviews';
import type { Review as ReviewType } from '@/common/types/reviews.types';
import Image from 'next/image';
import { Apple, Coins, Drama, HandPlatter, Star, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Rating from '../inputs/RatingComponent';

const ReviewListItem = ({ review, onDelete }: { review: ReviewType; onDelete?: () => void }) => {
	const session = useSession();
	const [isDeleting, setIsDeleting] = useState(false);

	const isPersonal = session.data?.user.id && session.data?.user.id === review.user?.id;

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteReview(review.id);
			onDelete?.();
			if (!onDelete) {
				window.location.reload();
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='flex gap-[36px]'>
			<div className='flex flex-col w-[150px] gap-y-[12px] justify-start items-center'>
				<img
					src={review.user?.avatarUrl ?? ''}
					alt={review.user?.userName ?? ''}
					className='size-[100px] object-cover rounded-full bg-card'
				/>
				<div className='flex flex-col gap-y-1 text-center justify-center items-center'>
					<p>
						{review.user?.firstName} {review.user?.lastName}
					</p>

					<p>x anmeldelser</p>
				</div>
			</div>
			<div className='w-full'>
				<div>
					<h3 className='font-semibold mb-1 text-[24px] leading-[30px]'>{review.title}</h3>
					<div className='flex items-center gap-x-2'>
						<Rating value={review.overallRating} hoverDisabled />
						<p className='text-[14px] leading-[20px]'>
							Anmeldt{' '}
							{new Date(review.createdAt).toLocaleDateString('nb-NO', {
								numberingSystem: 'latn',
							})}
						</p>
					</div>
					<p className='mt-2'>{review.comment}</p>
					<p className='mt-2 font-semibold'>
						Besøksdato:{' '}
						{new Date(review.dateVisited).toLocaleDateString('nb-NO', {
							numberingSystem: 'latn',
						})}
					</p>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div
	// 		key={review.id}
	// 		className={clsx(
	// 			'bg-white group p-5 rounded-md shadow-md mt-5 border',
	// 			isPersonal && 'border-2 border-blue-500',
	// 			isDeleting && 'opacity-50 pointer-events-none',
	// 		)}
	// 	>
	// 		<div className='flex justify-between'>
	// 			<div className='w-full'>
	// 				<div className='flex justify-between items-center'>
	// 					<h2 className='font-bold text-xl'>{review.title}</h2>
	// 					<p className='text-sm text-gray-500 mt-1'>
	// 						Besøksdato: <b>{new Date(review.dateVisited).toLocaleDateString()}</b>
	// 					</p>
	// 				</div>
	// 				<div className='flex justify-between items-center mt-3'>
	// 					<p className='flex-1'>{review.comment}</p>
	// 					{isPersonal && (
	// 						<div>
	// 							<button
	// 								type='button'
	// 								className='opacity-0 transition-opacity group-hover:opacity-100 inline-flex text-red-500 gap-x-1 items-center'
	// 								onClick={handleDelete}
	// 								disabled={isDeleting}
	// 							>
	// 								Slett
	// 								<Trash className='size-5' />
	// 							</button>
	// 						</div>
	// 					)}
	// 				</div>
	// 				<div className='pt-2'>
	// 					<p className='text-sm'>
	// 						{review.dishNames.length > 1 ? 'Retter: ' : 'Rett: '}
	// 						<span className='font-semibold'>{review.dishNames.join(', ')}</span>
	// 					</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		{review.user && (
	// 			<>
	// 				<div className='w-full h-0.5 border-b-gray-300 border-b my-3' />
	// 				<div className='flex justify-between items-center'>
	// 					<div className='flex gap-2 items-center'>
	// 						<img
	// 							src={review.user?.avatarUrl ?? ''}
	// 							alt={review.user?.userName ?? ''}
	// 							className='size-12 rounded-full'
	// 						/>
	// 						<div>
	// 							<p className='font-medium text-sm'>
	// 								{review.user?.firstName} {review.user.lastName}{' '}
	// 								{new Date(review.createdAt).toDateString()}
	// 							</p>
	// 							<p className='text-sm'>{review.user?.userName}</p>
	// 						</div>
	// 					</div>
	// 					<div className='flex items-center gap-4 justify-center'>
	// 						<div className='flex flex-col items-center justify-center'>
	// 							<Apple className='size-5' />
	// 							<span className='text-sm'>{review.foodQualityRating}</span>
	// 						</div>
	// 						<div className='flex flex-col items-center justify-center'>
	// 							<HandPlatter className='size-5' />
	// 							<span className='text-sm'>{review.serviceQualityRating}</span>
	// 						</div>
	// 						<div className='flex flex-col items-center justify-center'>
	// 							<Drama className='size-5' />
	// 							<span className='text-sm'>{review.ambianceRating}</span>
	// 						</div>
	// 						<div className='flex flex-col items-center justify-center'>
	// 							<Coins className='size-5' />
	// 							<span className='text-sm'>{review.valueForMoneyRating}</span>
	// 						</div>
	// 						<div className='flex flex-col items-center justify-center'>
	// 							<Star className='size-5' />
	// 							<span className='text-sm'>{review.overallRating}</span>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</>
	// 		)}
	// 	</div>
	// );
};

export default ReviewListItem;
