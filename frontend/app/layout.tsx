import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import GlobalClientProviders from '@/common/providers/global-client-providers';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Home } from 'lucide-react';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Fagprøve 2024 - notlimey',
	description:
		'Fagprøve 2024 - notlimey (Martin Kulvedrsøten Myhre). https://github.com/notlimey/final-apprentice-test',
	robots: 'noindex, nofollow',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang='en'>
			<body className={workSans.className}>
				<GlobalClientProviders>
					<nav className='h-[60px] flex items-center w-full justify-between'>
						<div className='max-w-[1240px] mx-auto flex justify-between w-full px-5'>
							<Link href={'/'} className='inline-flex items-center gap-1'>
								<Home className='size-5' />
								Home
							</Link>
							<ul className='max-w-[1240px] mx-auto flex justify-end gap-4 w-full'>
								{session?.user ? (
									<>
										<li>
											<Link href={'/api/auth/signout'}>Signout</Link>
										</li>
										<li>
											<Link href={'/profile'}>Profile</Link>
										</li>
									</>
								) : (
									<>
										<li>
											<Link href={'/auth/signup'}>Register</Link>
										</li>
										<li>
											<Link href={'/auth/signin'}>Sign in</Link>
										</li>
									</>
								)}
							</ul>
						</div>
					</nav>
					{children}
				</GlobalClientProviders>
			</body>
		</html>
	);
}
