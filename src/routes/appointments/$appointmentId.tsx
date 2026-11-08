import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const AppointmentDetailPage = (): FunctionComponent => {
	return <div className="p-4">Прийоми: редагування</div>;
};

export const Route = createFileRoute("/appointments/$appointmentId")({
	component: AppointmentDetailPage,
});
