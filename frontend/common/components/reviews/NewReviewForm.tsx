'use client';
import type { CreateReviewDto } from '@/common/types/reviews.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardTitle } from '../ui/card';
import { Form } from '../ui/form';

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
			dateVisited: new Date().toDateString(),
			foodQualityRating: 0,
			serviceQualityRating: 0,
			ambianceRating: 0,
			valueForMoneyRating: 0,
			overallRating: 0,
			comment: '',
		},
	});

	const onSubmit = async (data: CreateReviewDto) => {
		console.log(data);
	};

	return (
		<>
			<Form {...form}>
				<form>test1234</form>
			</Form>
		</>
	);
}
