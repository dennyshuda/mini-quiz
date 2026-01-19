import { Navigation } from "components/navigation";
import { Outlet } from "react-router";
import type { Route } from "./+types/_layout";
import { authMiddleware } from "~/middleware/auth";
import { userContext } from "~/context";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
	const user = context.get(userContext);
	return { user };
}

export default function QuizLayout({ loaderData }: Route.ComponentProps) {
	return (
		<div className="min-h-screen bg-slate-50">
			<Navigation user={loaderData.user} />

			<main className="max-w-7xl mx-auto py-8">
				<Outlet />
			</main>
		</div>
	);
}
