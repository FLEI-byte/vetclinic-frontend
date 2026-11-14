import { useParams } from "@tanstack/react-router";
import type { FunctionComponent } from "@/common/types";
import {
	useMedicalCard,
	useUpdateMedicalCard,
} from "@/features/medical-cards/api";
import { MedicalCardForm } from "@/features/medical-cards/components/MedicalCardForm";
import { SEX_VALUES } from "@/features/medical-cards/schema";

export const MedicalCardEditPage = (): FunctionComponent => {
	const { medicalCardId } = useParams({
		from: "/medical-cards/$medicalCardId",
	});
	const id = Number(medicalCardId);
	const { data: card, isError, isLoading } = useMedicalCard(id);
	const updateCardMutation = useUpdateMedicalCard();

	if (isLoading)
		return <div className="p-4 animate-pulse">Завантаження картки...</div>;
	if (isError || !card)
		return <div className="p-4 text-red-600">Картку не знайдено.</div>;

	const sex = SEX_VALUES.find((value) => value === card.sex);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Редагування: {card.nickname}</h1>
			<MedicalCardForm
				isPending={updateCardMutation.isPending}
				serverError={updateCardMutation.error?.message}
				submitLabel="Зберегти зміни"
				defaultValues={{
					birth_date: card.birth_date.slice(0, 10),
					breed: card.breed,
					client_id: card.client ? String(card.client.id) : "",
					nickname: card.nickname,
					sex,
					species: card.species,
				}}
				onSubmit={(data) => {
					updateCardMutation.mutate({
						data: { ...data, client_id: Number(data.client_id) },
						id,
					});
				}}
			/>
		</div>
	);
};
