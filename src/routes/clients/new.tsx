import { createFileRoute } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";

const ClientNewPage = (): FunctionComponent => {
	return <div className="p-4">Клієнти: створення</div>;
};

export const Route = createFileRoute("/clients/new")({
	component: ClientNewPage,
});
