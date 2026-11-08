import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const ClientsListPage = (): FunctionComponent => {
	return <div className="p-4">Клієнти: список</div>;
};

export const Route = createFileRoute("/clients/")({
	component: ClientsListPage,
});
