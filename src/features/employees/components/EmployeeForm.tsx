import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";
import { FormField } from "@/components/forms/FormField";
import {
	employeeSchema,
	type EmployeeFormData,
} from "@/features/employees/schema";

type EmployeeFormProps = {
	defaultValues?: EmployeeFormData;
	isPending: boolean;
	onSubmit: (data: EmployeeFormData) => void;
	serverError?: string;
	submitLabel: string;
};

export const EmployeeForm = ({
	defaultValues,
	isPending,
	onSubmit,
	serverError,
	submitLabel,
}: EmployeeFormProps): FunctionComponent => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<EmployeeFormData>({
		defaultValues,
		resolver: zodResolver(employeeSchema),
	});

	return (
		<form
			className="space-y-4 max-w-md"
			onSubmit={(event) => {
				void handleSubmit(onSubmit)(event);
			}}
		>
			<FormField
				error={errors.last_name?.message}
				id="last_name"
				label="Прізвище"
				registration={register("last_name")}
			/>
			<FormField
				error={errors.first_name?.message}
				id="first_name"
				label="Ім'я"
				registration={register("first_name")}
			/>
			<FormField
				error={errors.patronymic?.message}
				id="patronymic"
				label="По батькові"
				registration={register("patronymic")}
			/>
			<FormField
				error={errors.position?.message}
				id="position"
				label="Посада"
				registration={register("position")}
			/>
			<FormField
				error={errors.phone?.message}
				id="phone"
				label="Телефон"
				registration={register("phone")}
			/>
			<FormField
				error={errors.email?.message}
				id="email"
				label="Електронна пошта"
				registration={register("email")}
			/>
			{serverError ? (
				<p className="text-red-600">Помилка сервера: {serverError}</p>
			) : null}
			<div className="flex gap-4">
				<button
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
					disabled={isPending}
					type="submit"
				>
					{isPending ? "Збереження..." : submitLabel}
				</button>
				<Link className="px-4 py-2 border rounded" to="/employees">
					Скасувати
				</Link>
			</div>
		</form>
	);
};
