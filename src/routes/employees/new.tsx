import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const EmployeeNewPage = (): FunctionComponent => {
	return <div className="p-4">Співробітники: створення</div>;
};

export const Route = createFileRoute("/employees/new")({
	component: EmployeeNewPage,
});
