'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';
import NewReviewForm from './NewReviewForm';
import clsx from 'clsx';
import type { Review } from '@/common/types/reviews.types';

export default function CreateNewReviewCard({
	restaurantId,
	personal,
}: { restaurantId: string; personal?: Review | null }) {
	const [open, setOpen] = useState(false);

	if (personal) return null;

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle
						className='flex items-center gap-x-3 cursor-pointer group'
						onClick={() => setOpen((s) => !s)}
					>
						Ny anmeldelse
						<ChevronDown
							className={clsx(
								'size-5 transition-transform',
								open ? 'transform rotate-180' : 'transform -rotate-90',
							)}
						/>
					</CardTitle>
				</CardHeader>
				{open && (
					<CardContent>
						<NewReviewForm restaurantId={restaurantId} />
					</CardContent>
				)}
			</Card>
		</>
	);
}
