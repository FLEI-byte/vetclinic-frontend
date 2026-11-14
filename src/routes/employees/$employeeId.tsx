import { createFileRoute } from "@tanstack/react-router";
import { EmployeeEditPage } from "@/features/employees/pages/EmployeeEditPage";

export const Route = createFileRoute("/employees/$employeeId")({
	component: EmployeeEditPage,
});
