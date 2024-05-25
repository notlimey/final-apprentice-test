"use client";
import { SessionProvider } from "next-auth/react";
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
					height='3px'
					color={'#FFD700'}
					options={{ showSpinner: false }}
					shallowRouting
				/>
        </SessionProvider>
    )
}