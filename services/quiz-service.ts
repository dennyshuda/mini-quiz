import api from "lib/axios";

export async function getActiveQuiz() {
	try {
		const response = await api.get("/subtests/69675e6d22c9086bb445b46d");
		return response;
	} catch (error) {
		return null;
	}
}

export async function startQuiz(subtestId: string) {
	const response = await api.get(`/quiz/start/${subtestId}`);
	return response.data;
}
