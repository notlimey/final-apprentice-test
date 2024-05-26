import type { Override } from '@/common/types/extension.types';
import clsx from 'clsx';
// form
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea, type TextareaProps } from '../ui/textarea';
// @mui

// ----------------------------------------------------------------------

type RHFTextFieldProps = {
	id?: string;
	name: string;
	description?: string;
	label?: string;
	wrapperClassName?: string;
};

type Props = Override<TextareaProps, RHFTextFieldProps>;

export default function RHFTextarea({ name, wrapperClassName, ...other }: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FormItem className={clsx(wrapperClassName)}>
					{other.label && <FormLabel>{other.label}</FormLabel>}
					<FormControl>
						<Textarea {...field} {...other} />
					</FormControl>
					{other.description && <FormDescription>{other.description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
