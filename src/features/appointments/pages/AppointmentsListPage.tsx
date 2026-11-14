import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import {
	useAppointments,
	useDeleteAppointment,
} from "@/features/appointments/api";

export const AppointmentsListPage = (): FunctionComponent => {
	const { data: appointments, error, isError, isLoading } = useAppointments();
	const deleteAppointmentMutation = useDeleteAppointment();

	const handleDelete = (id: number): void => {
		if (window.confirm("Ви впевнені, що хочете видалити цей прийом?")) {
			deleteAppointmentMutation.mutate(id);
		}
	};

	if (isLoading)
		return <div className="p-4 animate-pulse">Завантаження...</div>;
	if (isError)
		return (
			<div className="p-4 text-red-600">
				Помилка завантаження: {error.message}
			</div>
		);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Прийоми</h1>
				<div className="flex gap-4 items-center">
					<Link className="underline" to="/">
						На головну
					</Link>
					<Link
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						to="/appointments/new"
					>
						Створити прийом
					</Link>
				</div>
			</div>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b text-left">Дата і час</th>
						<th className="py-2 px-4 border-b text-left">Тварина</th>
						<th className="py-2 px-4 border-b text-left">Власник</th>
						<th className="py-2 px-4 border-b text-left">Ветеринар</th>
						<th className="py-2 px-4 border-b text-left">Мета</th>
						<th className="py-2 px-4 border-b text-left">Діагноз</th>
						<th className="py-2 px-4 border-b text-left">Сума</th>
						<th className="py-2 px-4 border-b">Дії</th>
					</tr>
				</thead>
				<tbody>
					{appointments?.map((appointment) => (
						<tr key={appointment.id}>
							<td className="py-2 px-4 border-b">
								{new Date(appointment.appointment_date).toLocaleString("uk-UA")}
							</td>
							<td className="py-2 px-4 border-b">
								{appointment.medical_card?.nickname ?? "-"}
							</td>
							<td className="py-2 px-4 border-b">
								{appointment.medical_card?.client?.full_name ?? "-"}
							</td>
							<td className="py-2 px-4 border-b">
								{appointment.employee?.full_name ?? "-"}
							</td>
							<td className="py-2 px-4 border-b">{appointment.purpose}</td>
							<td className="py-2 px-4 border-b">
								{appointment.diagnosis ?? "-"}
							</td>
							<td className="py-2 px-4 border-b">{appointment.total}</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									className="text-indigo-600 hover:text-indigo-900 mr-4"
									params={{ appointmentId: String(appointment.id) }}
									to="/appointments/$appointmentId"
								>
									Редагувати
								</Link>
								<button
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
									disabled={deleteAppointmentMutation.isPending}
									type="button"
									onClick={() => {
										handleDelete(appointment.id);
									}}
								>
									Видалити
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
