import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const MedicalCardDetailPage = (): FunctionComponent => {
	return <div className="p-4">Медичні картки: редагування</div>;
};

export const Route = createFileRoute("/medical-cards/$medicalCardId")({
	component: MedicalCardDetailPage,
});
