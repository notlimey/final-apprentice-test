'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { type ReactNode, useState } from 'react';
import NewReviewForm from './NewReviewForm';
import clsx from 'clsx';
import type { Review } from '@/common/types/reviews.types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

export default function CreateNewReviewCard({
	restaurantId,
	personal,
	trigger,
}: { restaurantId: string; personal?: Review | null; trigger: ReactNode }) {
	const [open, setOpen] = useState(false);

	if (personal) return null;

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent className='sm:max-w-[800px] max-h-screen overflow-scroll'>
					<NewReviewForm restaurantId={restaurantId} />
				</DialogContent>
			</Dialog>
		</>
	);

	// return (
	// 	<>
	// 		<Card>
	// 			<CardHeader>
	// 				<CardTitle
	// 					className='flex items-center gap-x-3 cursor-pointer group'
	// 					onClick={() => setOpen((s) => !s)}
	// 				>
	// 					Ny anmeldelse
	// 					<ChevronDown
	// 						className={clsx(
	// 							'size-5 transition-transform',
	// 							open ? 'transform rotate-180' : 'transform -rotate-90',
	// 						)}
	// 					/>
	// 				</CardTitle>
	// 			</CardHeader>
	// 			{open && (
	// 				<CardContent>
	// 					<NewReviewForm restaurantId={restaurantId} />
	// 				</CardContent>
	// 			)}
	// 		</Card>
	// 	</>
	// );
}
