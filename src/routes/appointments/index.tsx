import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsListPage } from "@/features/appointments/pages/AppointmentsListPage";

export const Route = createFileRoute("/appointments/")({
	component: AppointmentsListPage,
});
