'use client';
import type { CreateReviewDto } from '@/common/types/reviews.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '../ui/card';
import { Form, FormField, FormItem } from '../ui/form';
import RHFInput from '../inputs/RHFInput';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import clsx from 'clsx';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Label } from '../ui/label';
import RHFTextarea from '../inputs/RHFTextarea';
import RHFRatingComponent from '../inputs/RHFRatingComponent';
import { createReview } from '@/common/lib/reviews';

const Schema = z.object({
	title: z.string(),
	dateVisited: z.date().transform((val) => {
		return val.toISOString().split('T')[0];
	}),
	foodQualityRating: z.number().int().min(1).max(5),
	serviceQualityRating: z.number().int().min(1).max(5),
	ambianceRating: z.number().int().min(1).max(5),
	valueForMoneyRating: z.number().int().min(1).max(5),
	overallRating: z.number().int().min(1).max(5),
	comment: z.string().min(1).max(500),
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
		},
	});

	const onSubmit = async (data: CreateReviewDto) => {
		await createReview(restaurantId, data);

		form.reset();

		window.location.reload();
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
											onSelect={(s: Date) => {
												form.setValue('dateVisited', s);
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<RHFTextarea
						name='comment'
						label='Kommentar'
						wrapperClassName='md:col-span-2 lg:row-span-3'
						rows={8}
					/>
					<RHFRatingComponent name='foodQualityRating' label='Matkvalitet' />
					<RHFRatingComponent name='serviceQualityRating' label='Service' />
					<RHFRatingComponent name='ambianceRating' label='Atmosfære' />
					<RHFRatingComponent name='valueForMoneyRating' label='Pris' />
					<RHFRatingComponent name='overallRating' label='Totalvurdering' />

					<Button
						type='submit'
						color='primary'
						className='md:col-span-2 lg:col-span-4'
						disabled={!form.formState.isValid}
					>
						Lagre
					</Button>
				</form>
			</Form>
		</>
	);
}
