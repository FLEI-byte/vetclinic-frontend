import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { useAuthStore } from "@/store/authStore";

export const Home = (): FunctionComponent => {
	const [t, i18n] = useTranslation();
	const token = useAuthStore((state) => state.token);
	const clearToken = useAuthStore((state) => state.clearToken);

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center gap-6">
			<p className="text-white text-6xl">{t("home.greeting")}</p>
			<p className="text-white text-2xl">VetClinic IS</p>
			<nav className="flex gap-4 text-white text-xl">
				<Link className="underline" to="/clients">
					Клієнти
				</Link>
				<Link className="underline" to="/employees">
					Співробітники
				</Link>
				<Link className="underline" to="/medical-cards">
					Медичні картки
				</Link>
				<Link className="underline" to="/appointments">
					Прийоми
				</Link>
			</nav>
			{token ? (
				<button
					className="text-white underline"
					type="button"
					onClick={clearToken}
				>
					Вийти
				</button>
			) : (
				<Link className="text-white underline" to="/login">
					Увійти
				</Link>
			)}
			<button
				className="hover:cursor-pointer"
				type="submit"
				onClick={onTranslateButtonClick}
			>
				translate
			</button>
		</div>
	);
};
