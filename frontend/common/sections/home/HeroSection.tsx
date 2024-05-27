'use client';

import Image from 'next/image';

export default function HeroSection() {
	return (
		<div className='flex items-center gap-[12px] justify-center self-stretch'>
			<div
				className='gap-[24px] flex flex-col justify-center items-center p-[80px] bg-primary'
				style={{ flex: '1 0 0' }}
			>
				<h1 className='text-[64px] font-semibold leading-[72px]'>Matopplevelser i Innlandet</h1>
				<p className='text-[36px] font-normal leading-[48px]'>Finn ditt neste måltid, både nært og fjernt</p>
			</div>
			<Image
				src='/images/hero-img.jpeg'
				alt='Hero image'
				width={800}
				height={600}
				className='object-cover object-center h-full max-h-[424px] self-stretch'
				style={{ flex: '1 0 0' }}
			/>
		</div>
	);
}
