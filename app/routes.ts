import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout("./quiz/_layout.tsx", [
		index("./quiz/home.tsx"),
		...prefix("quiz", [
			route("history", "./quiz/history.tsx"),
			route("attempt/:id", "./quiz/attempt.tsx"),
		]),
	]),

	route("register", "./auth/register.tsx"),
	route("login", "./auth/login.tsx"),
	route("verify", "./auth/verify.tsx"),
	route("@me", "./auth/me.tsx"),
] satisfies RouteConfig;
