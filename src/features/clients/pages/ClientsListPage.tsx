import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import { useClients, useDeleteClient } from "@/features/clients/api";

export const ClientsListPage = (): FunctionComponent => {
	const { data: clients, error, isError, isLoading } = useClients();
	const deleteClientMutation = useDeleteClient();

	const handleDelete = (id: number): void => {
		if (window.confirm("Ви впевнені, що хочете видалити цього клієнта?")) {
			deleteClientMutation.mutate(id);
		}
	};

	if (isLoading)
		return <div className="p-4 animate-pulse">Завантаження...</div>;
	if (isError)
		return (
			<div className="p-4 text-red-600">
				Помилка завантаження: {error.message}
			</div>
		);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Клієнти</h1>
				<div className="flex gap-4 items-center">
					<Link className="underline" to="/">
						На головну
					</Link>
					<Link
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						to="/clients/new"
					>
						Створити клієнта
					</Link>
				</div>
			</div>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b text-left">ПІБ</th>
						<th className="py-2 px-4 border-b text-left">Телефон</th>
						<th className="py-2 px-4 border-b text-left">Електронна пошта</th>
						<th className="py-2 px-4 border-b text-left">Дата народження</th>
						<th className="py-2 px-4 border-b text-left">Тварин</th>
						<th className="py-2 px-4 border-b">Дії</th>
					</tr>
				</thead>
				<tbody>
					{clients?.map((client) => (
						<tr key={client.id}>
							<td className="py-2 px-4 border-b">{client.full_name}</td>
							<td className="py-2 px-4 border-b">{client.phone}</td>
							<td className="py-2 px-4 border-b">{client.email}</td>
							<td className="py-2 px-4 border-b">{client.birth_date}</td>
							<td className="py-2 px-4 border-b">
								{client.medical_cards?.length ?? 0}
							</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									className="text-indigo-600 hover:text-indigo-900 mr-4"
									params={{ clientId: String(client.id) }}
									to="/clients/$clientId"
								>
									Редагувати
								</Link>
								<button
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
									disabled={deleteClientMutation.isPending}
									type="button"
									onClick={() => {
										handleDelete(client.id);
									}}
								>
									Видалити
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
