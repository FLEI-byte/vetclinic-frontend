import type { FunctionComponent } from "@/common/types";
import { useCreateAppointment } from "@/features/appointments/api";
import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";
import { toAppointmentInput } from "@/features/appointments/utilities";

export const AppointmentNewPage = (): FunctionComponent => {
	const createAppointmentMutation = useCreateAppointment();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Новий прийом</h1>
			<AppointmentForm
				isPending={createAppointmentMutation.isPending}
				serverError={createAppointmentMutation.error?.message}
				submitLabel="Створити"
				onSubmit={(data) => {
					createAppointmentMutation.mutate(toAppointmentInput(data));
				}}
			/>
		</div>
	);
};
