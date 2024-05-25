'use client';

import RHFInput from '@/common/components/inputs/RHFInput';
import { Button } from '@/common/components/ui/button';
import { Form } from '@/common/components/ui/form';
import type { LoginDto } from '@/common/types/auth.types';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginView = () => {
	const searchParams = useSearchParams();
	const methods = useForm<LoginDto>({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const handleLoginWithCredentials = async (data: LoginDto) => {
		const redirectUrl = searchParams.get('from') || '/';

		await signIn('credentials', {
			username: data.username,
			password: data.password,
			redirect: true,
			callbackUrl: redirectUrl,
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='bg-shade shadow-md px-8 py-8 rounded-lg max-w-lg mx-auto w-full'>
				<h1 className='mb-6 text-2xl md:text-4xl'>Login</h1>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(handleLoginWithCredentials)} className='space-y-8'>
						<div className='flex flex-col gap-y-4 mb-8'>
							<RHFInput name='username' label='Epost/Brukernavn' placeholder='ola.normann@gmail.com' />
							<RHFInput name='password' type='password' label='Passord' placeholder='********' />
						</div>
						<div className='flex justify-end gap-x-2'>
							<Button href='/'>Tilbake</Button>
							<Button type='submit' color='primary'>
								Login
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LoginView;
