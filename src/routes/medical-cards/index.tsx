import { createFileRoute } from "@tanstack/react-router";
import { MedicalCardsListPage } from "@/features/medical-cards/pages/MedicalCardsListPage";

export const Route = createFileRoute("/medical-cards/")({
	component: MedicalCardsListPage,
});
