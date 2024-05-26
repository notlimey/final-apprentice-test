import type { Override } from '@/common/types/extension.types';
import type { RatingProps } from './RatingComponent';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import RatingComponent from './RatingComponent';

type RHFRatingComponentProps = {
	id?: string;
	name: string;
	description?: string;
	label?: string;
	wrapperClassName?: string;
	value?: number;
};

type Props = Override<RatingProps, RHFRatingComponentProps>;

export default function RHFRatingComponent({ name, wrapperClassName, ...other }: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FormItem className={clsx(wrapperClassName)}>
					{other.label && <FormLabel>{other.label}</FormLabel>}
					<FormControl>
						<RatingComponent
							{...field}
							onChange={(value) => field.onChange(value)}
							{...other}
							value={field.value as unknown as number}
						/>
					</FormControl>
					{other.description && <FormDescription>{other.description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
