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

	const handleSignInWithExternal = (provider: 'Google' | 'Discord') => {
		const returnUrl = `${window.location.origin}/auth/callback`;
		window.location.href = `${BASE_URL}Auth/externallogin?provider=${provider}&returnUrl=${encodeURIComponent(
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
					<div className='gap-y-1 flex flex-col pt-2 w-full'>
						<p>Or sign in with</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-1 w-full'>
							<Button
								variant='outline'
								title='Google signin'
								onClick={() => handleSignInWithExternal('Google')}
								className='inline-flex gap-1'
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									className='fill-current size-6'
								>
									<path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z' />
								</svg>
								Google
							</Button>
							<Button
								variant='outline'
								title='Discord signin'
								onClick={() => handleSignInWithExternal('Discord')}
								className='inline-flex gap-1'
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									className='fill-current size-6'
								>
									<path d='M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z' />
								</svg>
								Discord
							</Button>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginView;
