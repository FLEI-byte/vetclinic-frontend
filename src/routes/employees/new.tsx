import { createFileRoute } from "@tanstack/react-router";
import { EmployeeNewPage } from "@/features/employees/pages/EmployeeNewPage";

export const Route = createFileRoute("/employees/new")({
	component: EmployeeNewPage,
});
