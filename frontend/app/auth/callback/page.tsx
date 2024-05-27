'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

const GoogleCallback = ({ searchParams }: { searchParams: { token: string; id: string } }) => {
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleGoogleCallback = async () => {
			const { token, id } = searchParams;

			if (token) {
				// Using NextAuth to sign in the user with received token
				await signIn('credentials', {
					redirect: true,
					authToken: token,
					callbackUrl: '/',
				});
			} else {
				// Handle login error or redirect to an error page
				router.replace('/auth/error');
			}
		};

		handleGoogleCallback();
	}, [searchParams]);

	return <div>Loading...</div>;
};

export default GoogleCallback;
