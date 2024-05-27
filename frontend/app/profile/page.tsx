import { fetchApi } from '@/common/lib/api';
import { notFound } from 'next/navigation';

const getExtendedUser = async () => {
	const data = await fetchApi('Auth/Personal/Extended').catch(() => null);

	return data?.data;
};

export default async function Profile() {
	const session = await getExtendedUser();

	if (!session) return notFound();

	return (
		<>
			<div className='max-w-xl mx-auto px-5 py-12'>
				<pre className='p-2 rounded-md bg-gray-100'>{JSON.stringify(session, null, 2)}</pre>
			</div>
		</>
	);
}
