import { createCookieSessionStorage } from "react-router";

type SessionData = {
	access_token: string;
	refresh_token: string;
};

type FlashData = {
	error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
	SessionData,
	FlashData
>({
	cookie: {
		name: "quiz-session",
		httpOnly: true,
		maxAge: 60 * 60 * 24,
		path: "/",
		sameSite: "lax",
		secrets: [process.env.SESSION_SECRET!],
		secure: process.env.NODE_ENV === "production",
	},
});

export { getSession, commitSession, destroySession };
