import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const AppointmentNewPage = (): FunctionComponent => {
	return <div className="p-4">Прийоми: створення</div>;
};

export const Route = createFileRoute("/appointments/new")({
	component: AppointmentNewPage,
});
