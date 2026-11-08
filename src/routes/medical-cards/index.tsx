import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const MedicalCardsListPage = (): FunctionComponent => {
	return <div className="p-4">Медичні картки: список</div>;
};

export const Route = createFileRoute("/medical-cards/")({
	component: MedicalCardsListPage,
});
