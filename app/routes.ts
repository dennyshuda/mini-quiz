import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout("./quiz/_layout.tsx", [
		index("./quiz/home.tsx"),
		...prefix("quiz", [
			route(":id", "./quiz/detail.tsx"),
			route("history", "./quiz/history.tsx"),
			route("history/:id", "./quiz/result.tsx"),
			route("attempt", "./quiz/attempt.tsx"),
			route("@me", "./auth/me.tsx"),
		]),
	]),

	route("register", "./auth/register.tsx"),
	route("login", "./auth/login.tsx"),
	route("verify", "./auth/verify.tsx"),

	route("/logout", "./routes/logout.ts"),
] satisfies RouteConfig;
