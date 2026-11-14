import { createFileRoute } from "@tanstack/react-router";
import { MedicalCardNewPage } from "@/features/medical-cards/pages/MedicalCardNewPage";

export const Route = createFileRoute("/medical-cards/new")({
	component: MedicalCardNewPage,
});
