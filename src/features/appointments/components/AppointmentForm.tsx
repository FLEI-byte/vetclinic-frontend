import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";
import { FormField } from "@/components/forms/FormField";
import { SelectField } from "@/components/forms/SelectField";
import {
	appointmentSchema,
	type AppointmentFormData,
} from "@/features/appointments/schema";
import { useEmployees } from "@/features/employees/api";
import { useMedicalCards } from "@/features/medical-cards/api";

type AppointmentFormProps = {
	defaultValues?: Partial<AppointmentFormData>;
	isPending: boolean;
	onSubmit: (data: AppointmentFormData) => void;
	serverError?: string;
	submitLabel: string;
};

export const AppointmentForm = ({
	defaultValues,
	isPending,
	onSubmit,
	serverError,
	submitLabel,
}: AppointmentFormProps): FunctionComponent => {
	const { data: cards } = useMedicalCards();
	const { data: employees } = useEmployees();
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<AppointmentFormData>({
		defaultValues,
		resolver: zodResolver(appointmentSchema),
	});

	const cardOptions = (cards ?? []).map((card) => ({
		label: `${card.nickname} (${card.client?.full_name ?? "-"})`,
		value: String(card.id),
	}));

	const employeeOptions = (employees ?? []).map((employee) => ({
		label: `${employee.full_name} (${employee.position})`,
		value: String(employee.id),
	}));

	return (
		<form
			className="space-y-4 max-w-md"
			onSubmit={(event) => {
				void handleSubmit(onSubmit)(event);
			}}
		>
			<SelectField
				error={errors.medical_card_id?.message}
				id="medical_card_id"
				label="Медична картка"
				options={cardOptions}
				placeholder="Оберіть медичну картку"
				registration={register("medical_card_id")}
			/>
			<SelectField
				error={errors.employee_id?.message}
				id="employee_id"
				label="Співробітник"
				options={employeeOptions}
				placeholder="Оберіть співробітника"
				registration={register("employee_id")}
			/>
			<FormField
				error={errors.appointment_date?.message}
				id="appointment_date"
				label="Дата і час прийому"
				registration={register("appointment_date")}
				type="datetime-local"
			/>
			<FormField
				error={errors.purpose?.message}
				id="purpose"
				label="Мета звернення"
				registration={register("purpose")}
			/>
			<FormField
				error={errors.exam_results?.message}
				id="exam_results"
				label="Результати огляду"
				registration={register("exam_results")}
			/>
			<FormField
				error={errors.diagnosis?.message}
				id="diagnosis"
				label="Діагноз"
				registration={register("diagnosis")}
			/>
			<FormField
				error={errors.total?.message}
				id="total"
				label="Сума, грн"
				registration={register("total")}
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
				<Link className="px-4 py-2 border rounded" to="/appointments">
					Скасувати
				</Link>
			</div>
		</form>
	);
};
