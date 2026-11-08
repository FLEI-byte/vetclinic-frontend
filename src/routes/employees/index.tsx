import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const EmployeesListPage = (): FunctionComponent => {
	return <div className="p-4">Співробітники: список</div>;
};

export const Route = createFileRoute("/employees/")({
	component: EmployeesListPage,
});
