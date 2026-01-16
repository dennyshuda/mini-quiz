import { Navigation } from "components/navigation";
import { UserProvider } from "context/UserContext";
import type { IUser } from "interfaces/user";
import api from "lib/axios";
import { Outlet } from "react-router";
import type { Route } from "./+types/_layout";

interface Props {
	data: Omit<IUser, "created_at" | "updated_at">;
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const response = await api.get("/auth/profile");

	return response.data;
}

export default function QuizLayout({ loaderData }: Route.ComponentProps) {
	const { data: user }: Props = loaderData;

	return (
		<UserProvider initialUser={user}>
			<div className="min-h-screen bg-slate-50">
				<Navigation />

				<main className="max-w-7xl mx-auto py-8">
					<Outlet />
				</main>
			</div>
		</UserProvider>
	);
}
