'use client';

import RHFInput from '@/common/components/inputs/RHFInput';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Form } from '@/common/components/ui/form';
import { BASE_URL } from '@/common/lib/constants/api';
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

	const handleSignInWithGoogle = () => {
		const returnUrl = `${window.location.origin}/auth/google-callback`;
		window.location.href = `${BASE_URL}Auth/externallogin?provider=Google&returnUrl=${encodeURIComponent(
			returnUrl,
		)}`;
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
				<CardFooter>
					<div className='gap-y-1 flex flex-col pt-2 border-t w-full'>
						<p>Or sign in with</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-1 w-full'>
							<Button onClick={handleSignInWithGoogle}>Google</Button>
							<Button disabled>Facebook</Button>
							<Button disabled>Discord</Button>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginView;
