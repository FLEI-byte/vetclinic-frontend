import { useParams } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import {
	useAppointment,
	useUpdateAppointment,
} from "@/features/appointments/api";
import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";
import {
	toAppointmentInput,
	toDateTimeLocal,
} from "@/features/appointments/utilities";

export const AppointmentEditPage = (): FunctionComponent => {
	const { appointmentId } = useParams({ from: "/appointments/$appointmentId" });
	const id = Number(appointmentId);
	const { data: appointment, isError, isLoading } = useAppointment(id);
	const updateAppointmentMutation = useUpdateAppointment();

	if (isLoading)
		return <div className="p-4 animate-pulse">Завантаження прийому...</div>;
	if (isError || !appointment)
		return <div className="p-4 text-red-600">Прийом не знайдено.</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">
				Редагування прийому №{appointment.id}
			</h1>
			<AppointmentForm
				isPending={updateAppointmentMutation.isPending}
				serverError={updateAppointmentMutation.error?.message}
				submitLabel="Зберегти зміни"
				defaultValues={{
					appointment_date: toDateTimeLocal(appointment.appointment_date),
					diagnosis: appointment.diagnosis ?? "",
					employee_id: appointment.employee
						? String(appointment.employee.id)
						: "",
					exam_results: appointment.exam_results ?? "",
					medical_card_id: appointment.medical_card
						? String(appointment.medical_card.id)
						: "",
					purpose: appointment.purpose,
					total: String(appointment.total),
				}}
				onSubmit={(data) => {
					updateAppointmentMutation.mutate({
						data: toAppointmentInput(data),
						id,
					});
				}}
			/>
		</div>
	);
};
