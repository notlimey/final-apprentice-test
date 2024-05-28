'use client';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function GlobalClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			{children}
			<ProgressBar
				height='4px'
				color={'hsl(130, 100%, 75%, 1)'}
				options={{ showSpinner: false }}
				shallowRouting
			/>
			<Toaster />
		</SessionProvider>
	);
}
