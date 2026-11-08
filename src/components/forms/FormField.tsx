import type { UseFormRegisterReturn } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";

type FormFieldProps = {
	error?: string;
	id: string;
	label: string;
	registration: UseFormRegisterReturn;
	type?: string;
};

export const FormField = ({
	error,
	id,
	label,
	registration,
	type = "text",
}: FormFieldProps): FunctionComponent => {
	return (
		<div>
			<label className="block font-medium" htmlFor={id}>
				{label}
			</label>
			<input
				className="w-full p-2 border rounded"
				id={id}
				type={type}
				{...registration}
			/>
			{error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
		</div>
	);
};
