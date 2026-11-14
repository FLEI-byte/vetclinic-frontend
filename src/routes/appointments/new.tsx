import { createFileRoute } from "@tanstack/react-router";
import { AppointmentNewPage } from "@/features/appointments/pages/AppointmentNewPage";

export const Route = createFileRoute("/appointments/new")({
	component: AppointmentNewPage,
});
