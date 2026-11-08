import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const MedicalCardNewPage = (): FunctionComponent => {
	return <div className="p-4">Медичні картки: створення</div>;
};

export const Route = createFileRoute("/medical-cards/new")({
	component: MedicalCardNewPage,
});
