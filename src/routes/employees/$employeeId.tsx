import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const EmployeeDetailPage = (): FunctionComponent => {
	return <div className="p-4">Співробітники: редагування</div>;
};

export const Route = createFileRoute("/employees/$employeeId")({
	component: EmployeeDetailPage,
});
