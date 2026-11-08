import { useParams } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import { useClient, useUpdateClient } from "@/features/clients/api";
import { ClientForm } from "@/features/clients/components/ClientForm";

export const ClientEditPage = (): FunctionComponent => {
	const { clientId } = useParams({ from: "/clients/$clientId" });
	const id = Number(clientId);
	const { data: client, isError, isLoading } = useClient(id);
	const updateClientMutation = useUpdateClient();

	if (isLoading)
		return <div className="p-4 animate-pulse">Завантаження клієнта...</div>;
	if (isError || !client)
		return <div className="p-4 text-red-600">Клієнта не знайдено.</div>;

	// Бекенд повертає ПІБ одним рядком, а приймає три окремі поля
	const [lastName = "", firstName = "", ...rest] = client.full_name.split(" ");

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">
				Редагування: {client.full_name}
			</h1>
			<ClientForm
				isPending={updateClientMutation.isPending}
				serverError={updateClientMutation.error?.message}
				submitLabel="Зберегти зміни"
				defaultValues={{
					birth_date: client.birth_date.slice(0, 10),
					email: client.email,
					first_name: firstName,
					last_name: lastName,
					patronymic: rest.join(" "),
					phone: client.phone,
				}}
				onSubmit={(data) => {
					updateClientMutation.mutate({ data, id });
				}}
			/>
		</div>
	);
};
