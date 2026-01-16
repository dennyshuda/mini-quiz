import { IconAlertCircle, IconLoader, IconLock, IconMail } from "@tabler/icons-react";
import { Input } from "components/input";
import api from "lib/axios";
import { Form, Link, redirect, useNavigation } from "react-router";
import { cn } from "utils/cn";
import type { Route } from "./+types/login";

export async function clientAction({ request }: Route.ClientActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const response = await api.post("/auth/login", { email, password });

		localStorage.setItem("accessToken", response.data.data.access_token);
		localStorage.setItem("refreshToken", response.data.data.refresh_token);

		return redirect("/list");
	} catch (err: any) {
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

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg border border-slate-100">
				<div className="mb-10 text-center">
					<h1 className="text-3xl font-black tracking-tight">Selamat Datang</h1>
					<p className="text-slate-500 mt-2 font-medium">Masuk untuk melanjutkan quiz.</p>
				</div>

				{actionData?.message && !actionData.success && (
					<div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl animate-shake">
						<IconAlertCircle size={18} className="shrink-0" />
						<span className="text-sm font-bold">{actionData.message}</span>
					</div>
				)}

				<Form method="post" className="space-y-6">
					<Input
						required
						label="Email"
						icon={IconMail}
						name="email"
						type="email"
						placeholder="name@domain.com"
					/>

					<Input
						required
						label="Password"
						icon={IconLock}
						name="password"
						type="password"
						placeholder="••••••••"
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className={cn(
							"w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95",
							isSubmitting && "cursor-not-allowed"
						)}
					>
						{isSubmitting ? <IconLoader className="size-5" /> : <IconLock className="size-5" />}{" "}
						Masuk
					</button>
				</Form>

				<p className="mt-8 text-center text-slate-500 font-medium text-sm">
					Belum punya akun?{" "}
					<Link to="/register" className="text-indigo-600 font-bold hover:underline">
						Buat akun baru
					</Link>
				</p>
			</div>
		</div>
	);
}
