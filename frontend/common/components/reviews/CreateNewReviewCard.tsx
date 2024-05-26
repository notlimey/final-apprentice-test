'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useState } from 'react';
import NewReviewForm from './NewReviewForm';
import clsx from 'clsx';

export default function CreateNewReviewCard({ restaurantId }: { restaurantId: string }) {
	const [open, setOpen] = useState(true);

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
