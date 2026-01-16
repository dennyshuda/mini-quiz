import type { FormState } from "interfaces/auth";
import api from "lib/axios";
import { redirect } from "react-router";

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const response = await api.post("/auth/login", { email, password });

		console.log(response);

		localStorage.setItem("accessToken", response.data.data.access_token);
		localStorage.setItem("refreshToken", response.data.data.refresh_token);

		if (response.data.success) {
			throw redirect("/list");
		}

		return {
			success: true,
			message: "Login Berhasil!",
		};
	} catch (err: any) {
		console.log(err);

		if (err.response?.data.error.code === "INVALID_CREDENTIALS") {
			return {
				success: false,
				message: "Email atau password salah.",
				code: "INVALID_CREDENTIALS",
			};
		}

		return {
			success: false,
			message: "Terjadi kesalahan koneksi.",
			code: "NOT FOUND",
		};
	}
}

export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const response = await api.post("/auth/register", { name, email, password });

		console.log(response);

		return {
			success: true,
			message: "Registrasi Berhasil!",
			code: "REGISTER_SUCCESS",
		};
	} catch (err: any) {
		if (err.response?.data.error.code === "VALIDATION_ERROR") {
			return {
				success: false,
				message: err.response.data.error.details,
				code: err.response?.data.error.code,
			};
		}

		return {
			success: false,
			message: "Terjadi kesalahan koneksi.",
			code: "ERROR",
		};
	}
}

export async function checkVerificationEmail() {
	try {
		const response = await api.get("/auth/profile");

		return response.data.data.is_verified;
	} catch (error: any) {
		return error;
	}
}
