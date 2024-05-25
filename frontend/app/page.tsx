import { getCurrentSession, getCurrentUser } from '@/common/lib/session';
import Image from 'next/image';

const getRestaurants = async () => {
	const session = await getCurrentUser();

	if (!session) {
		return null;
	}

	return session;
};

export default async function Home() {
	const data = await getRestaurants();

	return (
		<>
			<div>
				<h1>
					Welcome to the <span>Next.js</span> + <span>NextAuth.js</span> starter template!
				</h1>
				<pre className='p-4 mt-4 text-sm bg-gray-100 rounded-md'>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			</div>
		</>
	);
}
