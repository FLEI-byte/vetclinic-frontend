import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import { useDeleteEmployee, useEmployees } from "@/features/employees/api";

export const EmployeesListPage = (): FunctionComponent => {
	const { data: employees, error, isError, isLoading } = useEmployees();
	const deleteEmployeeMutation = useDeleteEmployee();

	const handleDelete = (id: number): void => {
		if (
			window.confirm("Ви впевнені, що хочете видалити цього співробітника?")
		) {
			deleteEmployeeMutation.mutate(id);
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
				<h1 className="text-2xl font-bold">Співробітники</h1>
				<div className="flex gap-4 items-center">
					<Link className="underline" to="/">
						На головну
					</Link>
					<Link
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						to="/employees/new"
					>
						Створити співробітника
					</Link>
				</div>
			</div>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b text-left">ПІБ</th>
						<th className="py-2 px-4 border-b text-left">Посада</th>
						<th className="py-2 px-4 border-b text-left">Телефон</th>
						<th className="py-2 px-4 border-b text-left">Електронна пошта</th>
						<th className="py-2 px-4 border-b text-left">Прийомів</th>
						<th className="py-2 px-4 border-b">Дії</th>
					</tr>
				</thead>
				<tbody>
					{employees?.map((employee) => (
						<tr key={employee.id}>
							<td className="py-2 px-4 border-b">{employee.full_name}</td>
							<td className="py-2 px-4 border-b">{employee.position}</td>
							<td className="py-2 px-4 border-b">{employee.phone}</td>
							<td className="py-2 px-4 border-b">{employee.email}</td>
							<td className="py-2 px-4 border-b">
								{employee.appointments?.length ?? 0}
							</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									className="text-indigo-600 hover:text-indigo-900 mr-4"
									params={{ employeeId: String(employee.id) }}
									to="/employees/$employeeId"
								>
									Редагувати
								</Link>
								<button
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
									disabled={deleteEmployeeMutation.isPending}
									type="button"
									onClick={() => {
										handleDelete(employee.id);
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
