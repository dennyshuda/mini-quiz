import { IconAlertCircle, IconLoader, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { Input } from "components/input";
import { axiosInstance } from "lib/axios";
import { Form, Link, redirect, useNavigation } from "react-router";
import { handleApiError } from "utils/error-handler";
import { getSession } from "~/session.server";
import type { Route } from "./+types/register";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.has("access_token")) {
		return redirect("/secure");
	}
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	const form = await request.formData();

	const name = form.get("name") as string;
	const email = form.get("email") as string;
	const password = form.get("password") as string;

	const axios = axiosInstance(session.get("access_token"));

	try {
		const response = await axios.post("/auth/register", { name, email, password });
		return redirect("/login");
	} catch (err: any) {
		return handleApiError(err);
	}
}

export default function RegisterPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
				<div className="mb-10 text-center">
					<h1 className="text-3xl font-black tracking-tight">Daftar Akun</h1>
					<p className="text-slate-500 mt-2 font-medium">Mulai perjalanan ambisiusmu sekarang.</p>
				</div>

				{actionData?.message && !actionData.success && (
					<div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl animate-shake">
						<IconAlertCircle size={18} className="shrink-0" />
						<span className="text-sm font-bold">{actionData.message}</span>
					</div>
				)}

				<Form method="POST" className="space-y-6">
					<Input
						label="Nama Lengkap"
						name="name"
						icon={IconUser}
						required
						placeholder="Bahlil Lahadalia"
					/>

					<Input
						label="Email"
						name="email"
						type="email"
						icon={IconMail}
						required
						placeholder="sawit@example.com"
					/>

					<Input
						label="Password"
						name="password"
						type="password"
						icon={IconMail}
						required
						placeholder="••••••••"
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
					>
						{isSubmitting ? <IconLoader className="size-5" /> : <IconLock className="size-5" />}{" "}
						Daftar
					</button>
				</Form>

				<p className="mt-8 text-center text-slate-500 font-medium text-sm">
					Sudah punya akun?{" "}
					<Link to="/login" className="text-[#4F46E5] font-bold hover:underline">
						Masuk disini
					</Link>
				</p>
			</div>
		</div>
	);
}
