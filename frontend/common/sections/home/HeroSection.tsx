'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection({
	img,
	subtitle,
	title,
	useNextImage = false,
}: {
	title: string;
	subtitle: string;
	img: {
		src: string;
		alt: string;
	};
	useNextImage?: boolean;
}) {
	const leftItemRef = useRef<HTMLDivElement>(null);
	const [maxHeight, setMaxHeight] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setMaxHeight(leftItemRef.current?.clientHeight ?? 0);
	}, [leftItemRef.current?.clientHeight]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 items-stretch gap-[12px]'>
			<div
				className='gap-[24px] flex flex-col justify-center items-center p-[20px] md:p-[80px] bg-primary-light'
				style={{ flex: '1 0 0', maxHeight: `${maxHeight + 160}px` }}
			>
				<div ref={leftItemRef}>
					<h1 className='text-[48px] sm:text-[56px] md:text-[64px] font-semibold leading-tight md:leading-[72px]'>
						{title}
					</h1>
					<p className='text-[28px] md:text-[36px] font-normal md:leading-[48px]'>{subtitle}</p>
				</div>
			</div>
			<div
				className='h-full self-stretch w-full'
				style={{
					maxHeight: `${maxHeight + 160}px`,
				}}
			>
				{useNextImage ? (
					<Image
						src={img.src}
						alt={img.alt}
						width={800}
						height={600}
						className='object-cover relative object-center h-full w-full self-stretch'
						style={{ flex: '1 0 0' }}
					/>
				) : (
					<img
						src={img.src}
						alt={img.alt}
						className='object-cover relative object-center h-full w-full self-stretch'
						style={{ flex: '1 0 0' }}
					/>
				)}
			</div>
		</div>
	);
}
