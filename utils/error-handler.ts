import { ERROR_CODES, ERROR_MESSAGES } from "lib/constant";

export function handleApiError(err: any) {
	if (err.response) {
		const code = err.response.data?.error?.code || err.response.data?.code;
		return {
			success: false,
			code: code || ERROR_CODES.SERVER_ERROR,
			message: ERROR_MESSAGES[code] || err.response.data?.message || "Terjadi kesalahan sistem.",
		};
	}

	if (err.request) {
		return {
			success: false,
			code: ERROR_CODES.NETWORK_ERROR,
			message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
		};
	}

	return {
		success: false,
		code: "UNKNOWN",
		message: err.message || "An unexpected error occurred.",
	};
}
