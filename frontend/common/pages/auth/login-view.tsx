'use client';

import RHFInput from '@/common/components/inputs/RHFInput';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
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
			<Card className='shadow-md rounded-lg max-w-lg mx-auto w-full'>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...methods}>
						<form onSubmit={methods.handleSubmit(handleLoginWithCredentials)} className='space-y-8'>
							<div className='flex flex-col gap-y-4 mb-8'>
								<RHFInput
									name='username'
									label='Epost/Brukernavn'
									placeholder='ola.normann@gmail.com'
								/>
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
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginView;
