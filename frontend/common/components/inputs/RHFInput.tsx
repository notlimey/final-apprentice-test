import { Override } from '@/common/types/extension.types';
// form
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, InputProps } from '../ui/input';
// @mui

// ----------------------------------------------------------------------

type RHFTextFieldProps = {
	id?: string;
	name: string;
    description?: string;
    label?: string;
};

type Props = Override<InputProps, RHFTextFieldProps>;

export default function RHFInput({ name, ...other }: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FormItem>
					{other.label && <FormLabel>{other.label}</FormLabel>}
					<FormControl>
						<Input {...field} {...other} />
					</FormControl>
					{other.description && <FormDescription>{other.description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}