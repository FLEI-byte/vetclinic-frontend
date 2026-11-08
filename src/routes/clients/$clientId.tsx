import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const ClientDetailPage = (): FunctionComponent => {
	return <div className="p-4">Клієнти: редагування</div>;
};

export const Route = createFileRoute("/clients/$clientId")({
	component: ClientDetailPage,
});
