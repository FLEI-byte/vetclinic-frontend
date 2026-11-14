import { useParams } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import { useEmployee, useUpdateEmployee } from "@/features/employees/api";
import { EmployeeForm } from "@/features/employees/components/EmployeeForm";

export const EmployeeEditPage = (): FunctionComponent => {
	const { employeeId } = useParams({ from: "/employees/$employeeId" });
	const id = Number(employeeId);
	const { data: employee, isError, isLoading } = useEmployee(id);
	const updateEmployeeMutation = useUpdateEmployee();

	if (isLoading)
		return (
			<div className="p-4 animate-pulse">Завантаження співробітника...</div>
		);
	if (isError || !employee)
		return <div className="p-4 text-red-600">Співробітника не знайдено.</div>;

	// Бекенд повертає ПІБ одним рядком, а приймає три окремі поля
	const [lastName = "", firstName = "", ...rest] =
		employee.full_name.split(" ");

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">
				Редагування: {employee.full_name}
			</h1>
			<EmployeeForm
				isPending={updateEmployeeMutation.isPending}
				serverError={updateEmployeeMutation.error?.message}
				submitLabel="Зберегти зміни"
				defaultValues={{
					email: employee.email,
					first_name: firstName,
					last_name: lastName,
					patronymic: rest.join(" "),
					phone: employee.phone,
					position: employee.position,
				}}
				onSubmit={(data) => {
					updateEmployeeMutation.mutate({ data, id });
				}}
			/>
		</div>
	);
};
