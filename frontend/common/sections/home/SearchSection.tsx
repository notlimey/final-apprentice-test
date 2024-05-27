'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchSection() {
	const [q, setQ] = useState('');
	const searchParams = useSearchParams();

	const query = searchParams.get('query') || '';

	const handleSearch = () => {
		if (!q) return;

		// Redirect to search page with query
		window.location.href = `/?query=${q}`;
	};

	return (
		<div className='flex py-[60px] px-5 md:px-[100px] bg-secondary justify-center items-center'>
			<div className='w-full px-[24px] bg-white border-[2px] border-[#A1B8E5] flex justify-between rounded-[6px] items-center max-w-[600px]'>
				<input
					type='text'
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder='Søk etter restaurant eller sted'
					className='py-[16px] w-full focus:outline-none'
				/>
				<Search className='size-6' />
			</div>
		</div>
	);
}
