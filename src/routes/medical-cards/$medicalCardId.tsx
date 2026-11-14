import { createFileRoute } from "@tanstack/react-router";
import { MedicalCardEditPage } from "@/features/medical-cards/pages/MedicalCardEditPage";

export const Route = createFileRoute("/medical-cards/$medicalCardId")({
	component: MedicalCardEditPage,
});
