import { axiosInstance } from "lib/axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { userContext } from "~/context";
import { destroySession, getSession } from "~/session.server";

export async function action({ request, context }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const token = session.get("access_token");

	try {
		const axios = axiosInstance(token);
		await axios.post("/auth/logout");

		context.set(userContext, null);
	} catch (error) {
		console.error("Backend logout failed", error);
	}

	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export async function loader() {
	return redirect("/");
}
