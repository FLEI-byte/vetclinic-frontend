import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";
import { FormField } from "@/components/forms/FormField";
import { SelectField } from "@/components/forms/SelectField";
import { useClients } from "@/features/clients/api";
import {
	medicalCardSchema,
	SEX_VALUES,
	type MedicalCardFormData,
} from "@/features/medical-cards/schema";

type MedicalCardFormProps = {
	defaultValues?: Partial<MedicalCardFormData>;
	isPending: boolean;
	onSubmit: (data: MedicalCardFormData) => void;
	serverError?: string;
	submitLabel: string;
};

export const MedicalCardForm = ({
	defaultValues,
	isPending,
	onSubmit,
	serverError,
	submitLabel,
}: MedicalCardFormProps): FunctionComponent => {
	const { data: clients } = useClients();
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<MedicalCardFormData>({
		defaultValues,
		resolver: zodResolver(medicalCardSchema),
	});

	const clientOptions = (clients ?? []).map((client) => ({
		label: `${client.full_name} (${client.phone})`,
		value: String(client.id),
	}));

	const sexOptions = SEX_VALUES.map((value) => ({ label: value, value }));

	return (
		<form
			className="space-y-4 max-w-md"
			onSubmit={(event) => {
				void handleSubmit(onSubmit)(event);
			}}
		>
			<SelectField
				error={errors.client_id?.message}
				id="client_id"
				label="Власник"
				options={clientOptions}
				placeholder="Оберіть власника"
				registration={register("client_id")}
			/>
			<FormField
				error={errors.nickname?.message}
				id="nickname"
				label="Кличка"
				registration={register("nickname")}
			/>
			<FormField
				error={errors.species?.message}
				id="species"
				label="Вид"
				registration={register("species")}
			/>
			<FormField
				error={errors.breed?.message}
				id="breed"
				label="Порода"
				registration={register("breed")}
			/>
			<SelectField
				error={errors.sex?.message}
				id="sex"
				label="Стать"
				options={sexOptions}
				placeholder="Оберіть стать"
				registration={register("sex")}
			/>
			<FormField
				error={errors.birth_date?.message}
				id="birth_date"
				label="Дата народження"
				registration={register("birth_date")}
				type="date"
			/>
			{serverError ? (
				<p className="text-red-600">Помилка сервера: {serverError}</p>
			) : null}
			<div className="flex gap-4">
				<button
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
					disabled={isPending}
					type="submit"
				>
					{isPending ? "Збереження..." : submitLabel}
				</button>
				<Link className="px-4 py-2 border rounded" to="/medical-cards">
					Скасувати
				</Link>
			</div>
		</form>
	);
};
