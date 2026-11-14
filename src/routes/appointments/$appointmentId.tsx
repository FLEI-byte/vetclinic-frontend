import { createFileRoute } from "@tanstack/react-router";
import { AppointmentEditPage } from "@/features/appointments/pages/AppointmentEditPage";

export const Route = createFileRoute("/appointments/$appointmentId")({
	component: AppointmentEditPage,
});
