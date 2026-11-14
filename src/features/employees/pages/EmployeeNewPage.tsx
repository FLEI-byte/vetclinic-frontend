import type { FunctionComponent } from "@/common/types";
import { useCreateEmployee } from "@/features/employees/api";
import { EmployeeForm } from "@/features/employees/components/EmployeeForm";

export const EmployeeNewPage = (): FunctionComponent => {
	const createEmployeeMutation = useCreateEmployee();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Новий співробітник</h1>
			<EmployeeForm
				isPending={createEmployeeMutation.isPending}
				serverError={createEmployeeMutation.error?.message}
				submitLabel="Створити"
				onSubmit={(data) => {
					createEmployeeMutation.mutate(data);
				}}
			/>
		</div>
	);
};
