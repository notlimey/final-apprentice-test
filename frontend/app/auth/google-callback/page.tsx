'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { BASE_URL } from '@/common/lib/constants/api';
import { useRouter } from 'next/navigation';

const GoogleCallback = ({ searchParams }: { searchParams: { code: string; state: string } }) => {
	const session = useSession();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleGoogleCallback = async () => {
			const { code, state } = searchParams; // Ensure it captures correct tokens

			if (code) {
				try {
					const response = await axios.get(`${BASE_URL}Auth/externallogincallback`, {
						params: {
							code,
							state, // pass state if necessary
						},
					});

					if (response.status === 200) {
						const { user, authToken, roles } = response.data;

						// Pass auth token that you return from your API to NextAuth via signIn method
						await signIn('credentials', {
							...user,
							token: authToken,
							callbackUrl: '/',
						});
					}
				} catch (error) {
					console.error('Error during Google callback login:', error);
					// Redirect to an error page or show an error message if necessary
					router.replace('/auth/error');
				}
			}
		};

		if (session.status !== 'loading' && session.data === null) {
			handleGoogleCallback();
		}
		if (session.data) {
			router.replace('/');
		}
	}, [searchParams, session.status, session.data]);

	return <div>Loading...</div>;
};

export default GoogleCallback;
