import type { FunctionComponent } from "@/common/types";
import { useCreateMedicalCard } from "@/features/medical-cards/api";
import { MedicalCardForm } from "@/features/medical-cards/components/MedicalCardForm";

export const MedicalCardNewPage = (): FunctionComponent => {
	const createCardMutation = useCreateMedicalCard();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Нова медична картка</h1>
			<MedicalCardForm
				isPending={createCardMutation.isPending}
				serverError={createCardMutation.error?.message}
				submitLabel="Створити"
				onSubmit={(data) => {
					createCardMutation.mutate({
						...data,
						client_id: Number(data.client_id),
					});
				}}
			/>
		</div>
	);
};
