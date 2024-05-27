'use client';
import type { CreateReviewDto } from '@/common/types/reviews.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '../ui/card';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import RHFInput from '../inputs/RHFInput';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon, Plus, X } from 'lucide-react';
import clsx from 'clsx';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Label } from '../ui/label';
import RHFTextarea from '../inputs/RHFTextarea';
import RHFRatingComponent from '../inputs/RHFRatingComponent';
import { createReview } from '@/common/lib/reviews';
import AddRestaurantDish from './AddRestaurantDish';
import { useToast } from '../ui/use-toast';

const Schema = z.object({
	title: z.string().min(1, 'Minimum 1 tegn').max(50, 'Maks 50 tegn'),
	dateVisited: z
		.date()
		.max(new Date(), 'Datoen må være i dag eller tidligere')
		.transform((val) => {
			return val.toISOString().split('T')[0];
		}),
	foodQualityRating: z.number().int().min(1, 'Påkrevd').max(5),
	serviceQualityRating: z.number().int().min(1, 'Påkrevd').max(5),
	ambianceRating: z.number().int().min(1, 'Påkrevd').max(5),
	valueForMoneyRating: z.number().int().min(1, 'Påkrevd').max(5),
	overallRating: z.number().int().min(1, 'Påkrevd').max(5),
	comment: z.string().min(1, 'Minimum 1 tegn').max(500, 'Maks 500 tegn'),
	dishNames: z.array(z.string()).min(1, 'Legg til minst én rett'),
});

export default function NewReviewForm({ restaurantId }: { restaurantId: string }) {
	const form = useForm<CreateReviewDto>({
		resolver: zodResolver(Schema),
		defaultValues: {
			title: '',
			dateVisited: new Date(),
			foodQualityRating: 0,
			serviceQualityRating: 0,
			ambianceRating: 0,
			valueForMoneyRating: 0,
			overallRating: 0,
			comment: '',
			dishNames: [],
		},
	});

	const { toast } = useToast();

	const onSubmit = async (data: CreateReviewDto) => {
		try {
			await createReview(restaurantId, data);

			form.reset();

			toast({
				title: 'Anmeldelse lagret',
				description: 'Anmeldelsen din har blitt lagret.',
			});

			window.location.reload();
		} catch (error) {
			toast({
				title: 'Noe gikk galt',
				description: `Kunne ikke legge til restauranten${
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any)?.message
				}`,
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'
				>
					<RHFInput
						name='title'
						label='Tittel'
						wrapperClassName='lg:col-span-3'
						placeholder='en kort tittel..'
					/>
					<FormField
						name='dateVisited'
						control={form.control}
						render={({ field }) => (
							<FormItem className='gap-y-2 flex flex-col'>
								<Label>Dato besøkt</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={clsx(
												'w-[280px] justify-start text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0'>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={(s) => {
												if (s) form.setValue('dateVisited', s);
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<RHFTextarea
						name='comment'
						label='Kommentar'
						wrapperClassName='md:col-span-2 lg:row-span-3'
						description={`Max 500 tegn. Du har ${500 - form.watch('comment').length} tegn igjen.`}
						rows={8}
					/>
					<RHFRatingComponent name='foodQualityRating' label='Matkvalitet' />
					<RHFRatingComponent name='serviceQualityRating' label='Service' />
					<RHFRatingComponent name='ambianceRating' label='Atmosfære' />
					<RHFRatingComponent name='valueForMoneyRating' label='Pris' />
					<RHFRatingComponent name='overallRating' label='Totalvurdering' />
					<FormField
						name='dishNames'
						control={form.control}
						render={({ field }) => (
							<FormItem className='col-span-3'>
								<div className='flex flex-wrap gap-3'>
									{field.value?.map((dish, index) => (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className='inline-flex items-center gap-x-1 px-3 py-1 text-sm rounded-full bg-gray-100'
										>
											{dish}
											<button
												type='button'
												onClick={() => {
													form.setValue(
														'dishNames',
														field.value.filter((_, i) => i !== index),
													);
												}}
											>
												<X className='size-3' />
											</button>
										</div>
									))}
									<AddRestaurantDish
										onAdd={(dish) => {
											form.setValue('dishNames', [...field.value, dish]);
										}}
									>
										<button
											type='button'
											className='inline-flex items-center gap-x-1 px-3 py-1 text-sm rounded-full bg-gray-100 border'
										>
											Legg til rett <Plus className='size-3' />
										</button>
									</AddRestaurantDish>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' color='primary' className='md:col-span-2 lg:col-span-4'>
						Lagre
					</Button>
				</form>
			</Form>
		</>
	);
}
