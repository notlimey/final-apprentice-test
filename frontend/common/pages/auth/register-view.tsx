'use client';

import RHFInput from '@/common/components/inputs/RHFInput';
import { Button } from '@/common/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/common/components/ui/form';
import { Switch } from '@/common/components/ui/switch';
import { registerUser } from '@/common/lib/auth';
import type { RegisterDto } from '@/common/types/auth.types';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ChevronLeft, HomeIcon, Lock } from 'lucide-react';

const RegisterView = () => {
	const router = useRouter();
	const methods = useForm<
		RegisterDto & {
			confirm_password: string;
		}
	>({
		defaultValues: {
			userName: '',
			password: '',
			avatarUrl: '',
			email: '',
			firstName: '',
			isAnonymous: false,
			lastName: '',
			confirm_password: '',
		},
	});

	const handleLoginWithCredentials = async ({
		confirm_password,
		...data
	}: RegisterDto & {
		confirm_password: string;
	}) => {
		if (data.password !== confirm_password) {
			alert('Passwords do not match');
			return;
		}

		try {
			await registerUser({
				...data,
				avatarUrl: `https://api.dicebear.com/8.x/adventurer/svg?seed=${data.userName}`,
			});

			router.push('/auth/signin');
		} catch (error) {
			alert('Error registering user');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='bg-shade shadow-md px-8 py-8 rounded-lg max-w-2xl mx-auto w-full'>
				<div className='mb-6'>
					<h1 className='mb-2 text-2xl md:text-4xl'>Opprett ny bruker</h1>
					<p className='text-sm text-gray-500'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</p>
				</div>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(handleLoginWithCredentials)} className='space-y-8'>
						<div className='flex flex-col gap-y-4 mb-8'>
							<FormField
								control={methods.control}
								name='isAnonymous'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base inline-flex items-center gap-x-2'>
												<Lock className='size-4' />
												Vær anonym
											</FormLabel>
											<FormDescription>
												Hvis du ønsker å være anonym, kan du velge å ikke vise navnet ditt på
												siden. Brukernavn vil være det eneste som vises.
											</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<RHFInput name='email' label='Epost' placeholder='ola.normann@gmail.com' />
								<RHFInput name='userName' label='Brukernavn' placeholder='ola.normann@gmail.com' />
								<RHFInput
									name='firstName'
									label='Fornavn'
									placeholder='Ola'
									disabled={methods.watch('isAnonymous')}
								/>
								<RHFInput
									name='lastName'
									label='Etternavn'
									placeholder='Normann'
									disabled={methods.watch('isAnonymous')}
								/>
								<RHFInput name='password' type='password' label='Passord' placeholder='********' />
								<RHFInput
									name='confirm_password'
									type='password'
									label='Bekreft passord'
									placeholder='********'
								/>
							</div>
						</div>
						<div className='flex justify-between'>
							<div className='flex justify-end gap-x-2'>
								<Button href='/' variant={'outline'}>
									<HomeIcon className='size-4 mr-2' />
									Hjem
								</Button>
							</div>
							<div className='flex justify-end gap-x-2'>
								<Button href='/' variant={'outline'}>
									<ChevronLeft className='size-4 mr-2' />
									Login
								</Button>
								<Button type='submit' color='primary'>
									Registrer
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default RegisterView;
