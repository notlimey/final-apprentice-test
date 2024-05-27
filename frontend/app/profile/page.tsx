import { fetchApi } from '@/common/lib/api';
import { getCurrentSession, getCurrentUser } from '@/common/lib/session';

const getExtendedUser = async () => {
	const data = await fetchApi('Auth/Personal/Extended');

	return data.data;
};

export default async function Profile() {
	const session = await getExtendedUser();

	return (
		<>
			<div className='max-w-xl mx-auto px-5 py-12'>
				<pre className='p-2 rounded-md bg-gray-100'>{JSON.stringify(session, null, 2)}</pre>
			</div>
		</>
	);
}
