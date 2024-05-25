'use client';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { useState } from 'react';

type RatingProps = {
	value: number;
	onChange?: (value: number) => void;
	size?: number;
	hoverDisabled?: boolean;
};

const Rating: React.FC<RatingProps> = ({ value, onChange, size = 20, hoverDisabled }) => {
	const [hover, setHover] = useState<number | null>(null);

	return (
		<div className='flex items-center space-x-1'>
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
						(hover || value) >= star
							? 'fill-yellow-400 stroke-yellow-400'
							: 'fill-gray-100 stroke-gray-300',
					)}
				/>
			))}
		</div>
	);
};

export default Rating;
