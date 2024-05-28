'use client';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { useState } from 'react';

export type RatingProps = {
	value: number;
	onChange?: (value: number) => void;
	size?: number;
	hoverDisabled?: boolean;
	numberOfRatings?: number;
};

const Rating: React.FC<RatingProps> = ({ value, onChange, size = 20, hoverDisabled, numberOfRatings }) => {
	const [hover, setHover] = useState<number | null>(null);

	return (
		<div className='flex items-center gap-x-2'>
			{Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
				<Star
					key={star}
					onClick={() => onChange?.(star)}
					onMouseEnter={() => !hoverDisabled && setHover(star)}
					onMouseLeave={() => !hoverDisabled && setHover(null)}
					className={clsx(
						// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
						`cursor-pointer`,
						`w-[${size}px]`,
						(hover || value) >= star ? 'fill-primary stroke-primary' : 'fill-card stroke-card',
					)}
				/>
			))}
			{numberOfRatings && numberOfRatings >= 1 ? (
				<span className='text-[12px] text-[#444]'>
					{numberOfRatings} {numberOfRatings === 1 ? 'vurdering' : 'vurderinger'}
				</span>
			) : null}
		</div>
	);
};

export default Rating;
