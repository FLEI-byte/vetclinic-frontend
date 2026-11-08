import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const AppointmentsListPage = (): FunctionComponent => {
	return <div className="p-4">Прийоми: список</div>;
};

export const Route = createFileRoute("/appointments/")({
	component: AppointmentsListPage,
});
