'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import RHFInput from '../inputs/RHFInput';
import { Button } from '../ui/button';
import { createRestaurant } from '@/common/lib/restaurants';
import type { CreateRestaurantDto } from '@/common/types/restaurants.types';
import { useToast } from '../ui/use-toast';

const timestamp = z
	.string()
	.refine((value) => /^\d{2}:\d{2}$/.test(value), 'Åpner må være på formatet hh:mm')
	.transform((str) => {
		return `${str}:00`;
	});

const hours = z.object({
	opensAt: timestamp,
	closesAt: timestamp,
});

const Schema = z.object({
	name: z.string().min(2, 'Navnet må være minst 2 tegn').max(50, 'Navnet kan ikke være mer enn 50 tegn'),
	slug: z.string().min(2, 'Slug må være minst 2 tegn').max(50, 'Slug kan ikke være mer enn 50 tegn'),
	description: z
		.string()
		.min(10, 'Beskrivelsen må være minst 10 tegn')
		.max(200, 'Beskrivelsen kan ikke være mer enn 200 tegn'),
	foodType: z.string().min(2, 'Mattypen må være minst 2 tegn').max(50, 'Mattypen kan ikke være mer enn 50 tegn'),
	address: z.string().min(5, 'Adressen må være minst 5 tegn').max(100, 'Adressen kan ikke være mer enn 100 tegn'),
	state: z.string().min(2, 'Stat må være minst 2 tegn').max(50, 'Stat kan ikke være mer enn 50 tegn'),
	city: z.string().min(2, 'Byen må være minst 2 tegn').max(50, 'Byen kan ikke være mer enn 50 tegn'),
	zipCode: z
		.string()
		.min(4, 'Postnummeret må være minst 4 tegn')
		.max(10, 'Postnummeret kan ikke være mer enn 10 tegn'),
	phoneNumber: z
		.string()
		.min(8, 'Telefonnummeret må være minst 8 tegn')
		.max(15, 'Telefonnummeret kan ikke være mer enn 15 tegn'),
	website: z.string().url('Nettstedet må være en gyldig URL'),
	imageUrl: z.string().url('Bildelenken må være en gyldig URL'),
	openingHours: z.object({
		monday: hours,
		tuesday: hours,
		wednesday: hours,
		thursday: hours,
		friday: hours,
		saturday: hours,
		sunday: hours,
	}),
	latitude: z.number().min(-90, 'Bredden må være minst -90').max(90, 'Bredden kan ikke være mer enn 90'),
	longitude: z.number().min(-180, 'Lengden må være minst -180').max(180, 'Lengden kan ikke være mer enn 180'),
});

export default function NewRestaurantForm() {
	const form = useForm<CreateRestaurantDto>({
		resolver: zodResolver(Schema),
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			foodType: '',
			address: '',
			state: 'Innlandet',
			city: '',
			zipCode: '',
			phoneNumber: '',
			website: '',
			imageUrl: '',
			openingHours: {
				monday: { opensAt: '00:00', closesAt: '00:00' },
				tuesday: { opensAt: '00:00', closesAt: '00:00' },
				wednesday: { opensAt: '00:00', closesAt: '00:00' },
				thursday: { opensAt: '00:00', closesAt: '00:00' },
				friday: { opensAt: '00:00', closesAt: '00:00' },
				saturday: { opensAt: '00:00', closesAt: '00:00' },
				sunday: { opensAt: '00:00', closesAt: '00:00' },
			},
			latitude: 0,
			longitude: 0,
		},
	});

	const { toast } = useToast();

	const onSubmit = async (data: CreateRestaurantDto) => {
		try {
			await createRestaurant(data);

			form.reset();

			toast({
				title: 'Restaurant lagt til',
				description: 'Restauranten ble lagt til i databasen',
			});
		} catch (error) {
			console.error(error);

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
		<Form {...form}>
			<form
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<RHFInput name='name' label='Navn' placeholder='Navnet på restauranten' />
				<RHFInput name='slug' label='Slug' placeholder='Slug' />
				<RHFInput name='description' label='Beskrivelse' placeholder='Beskrivelse' />
				<RHFInput name='foodType' label='Mattype' placeholder='Mattype' />
				<RHFInput name='address' label='Adresse' placeholder='Adresse' />
				<RHFInput name='state' label='Stat' placeholder='Stat' />
				<RHFInput name='city' label='By' placeholder='By' />
				<RHFInput name='zipCode' label='Postnummer' placeholder='Postnummer' />
				<RHFInput name='phoneNumber' label='Telefonnummer' placeholder='Telefonnummer' />
				<RHFInput name='website' label='Nettsted' placeholder='Nettsted' />
				<RHFInput name='imageUrl' label='Bilde URL' placeholder='Bilde URL' />
				<RHFInput name='latitude' label='Breddegrad' placeholder='Breddegrad' />
				<RHFInput name='longitude' label='Lengdegrad' placeholder='Lengdegrad' />

				<Button type='submit' color='primary' className='col-span-3'>
					Legg til restaurant
				</Button>
			</form>
		</Form>
	);
}
