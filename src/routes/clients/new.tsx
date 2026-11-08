import { createFileRoute } from "@tanstack/react-router";
import { ClientNewPage } from "@/features/clients/pages/ClientNewPage";

export const Route = createFileRoute("/clients/new")({
	component: ClientNewPage,
});
