import type { UseFormRegisterReturn } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";

type SelectOption = {
	label: string;
	value: string;
};

type SelectFieldProps = {
	error?: string;
	id: string;
	label: string;
	options: Array<SelectOption>;
	placeholder: string;
	registration: UseFormRegisterReturn;
};

export const SelectField = ({
	error,
	id,
	label,
	options,
	placeholder,
	registration,
}: SelectFieldProps): FunctionComponent => {
	return (
		<div>
			<label className="block font-medium" htmlFor={id}>
				{label}
			</label>
			<select
				className="w-full p-2 border rounded bg-white"
				id={id}
				{...registration}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
		</div>
	);
};
