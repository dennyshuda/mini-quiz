import { axiosInstance } from "lib/axios";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { userContext } from "~/context";
import { getSession } from "~/session.server";

export const authMiddleware = async ({ request, context }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const token = session.get("access_token");

	if (!token) {
		throw redirect("/login");
	}

	try {
		const axios = axiosInstance(session.get("access_token"));
		const user = await axios.get("/auth/profile");

		context.set(userContext, user.data.data);

		if (!user.data.data.is_verified) {
			return redirect("/verify");
		}
	} catch (error) {
		throw redirect("/login");
	}
};
