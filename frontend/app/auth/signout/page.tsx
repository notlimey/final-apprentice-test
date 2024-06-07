'use client';

import { Button } from '@/common/components/ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signout() {
	const router = useRouter();

	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/' });
		if (data?.url) {
			router.push(data.url);
		}

		window.location.href = '/';
	};

	return (
		<div className='flex justify-center items-center min-h-screen w-full'>
			<Button onClick={() => handleSignOut()}>Sign out</Button>
		</div>
	);
}
