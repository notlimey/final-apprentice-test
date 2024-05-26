'use client';

import { Copy, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

export default function AddRestaurantDish({
	children,
	onAdd,
}: { children: React.ReactNode; onAdd?: (str: string) => void }) {
	const [dish, setDish] = useState('');

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Legg til matrett</DialogTitle>
					</DialogHeader>
					<div className='flex items-center space-x-2'>
						<div className='grid flex-1 gap-2'>
							<Label htmlFor='dish' className='sr-only'>
								Matrett
							</Label>
							<Input
								id='dish'
								value={dish}
								onChange={(e) => setDish(e.target.value)}
								placeholder='F.eks. Biffsnadder'
								autoFocus
							/>
						</div>
					</div>
					<DialogFooter className='sm:justify-end'>
						<DialogClose asChild>
							<Button type='button' variant='secondary'>
								Avbryt
							</Button>
						</DialogClose>
						<DialogClose>
							<Button
								type='button'
								onClick={() => {
									onAdd?.(dish);
									setDish('');
								}}
								size='sm'
								className='px-3 gap-x-1.5'
							>
								<span>Legg til</span>
								<Plus className='h-4 w-4' />
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
