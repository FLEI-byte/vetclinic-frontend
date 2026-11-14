import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FunctionComponent } from "@/common/types";
import { FormField } from "@/components/forms/FormField";
import { useLogin } from "@/features/auth/api";
import { loginSchema, type LoginFormData } from "@/features/auth/schema";

export const LoginPage = (): FunctionComponent => {
	const loginMutation = useLogin();
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	return (
		<div className="p-4 max-w-md">
			<h1 className="text-2xl font-bold mb-4">Вхід</h1>
			<form
				className="space-y-4"
				onSubmit={(event) => {
					void handleSubmit((data) => {
						loginMutation.mutate(data);
					})(event);
				}}
			>
				<FormField
					error={errors.email?.message}
					id="email"
					label="Електронна пошта"
					registration={register("email")}
				/>
				<FormField
					error={errors.password?.message}
					id="password"
					label="Пароль"
					registration={register("password")}
					type="password"
				/>
				{loginMutation.isError ? (
					<p className="text-red-600">
						Помилка входу: {loginMutation.error.message}
					</p>
				) : null}
				<button
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
					disabled={loginMutation.isPending}
					type="submit"
				>
					{loginMutation.isPending ? "Вхід..." : "Увійти"}
				</button>
			</form>
		</div>
	);
};
