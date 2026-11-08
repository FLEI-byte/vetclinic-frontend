import type { FunctionComponent } from "@/common/types";
import { useCreateClient } from "@/features/clients/api";
import { ClientForm } from "@/features/clients/components/ClientForm";

export const ClientNewPage = (): FunctionComponent => {
	const createClientMutation = useCreateClient();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Новий клієнт</h1>
			<ClientForm
				isPending={createClientMutation.isPending}
				serverError={createClientMutation.error?.message}
				submitLabel="Створити"
				onSubmit={(data) => {
					createClientMutation.mutate(data);
				}}
			/>
		</div>
	);
};
