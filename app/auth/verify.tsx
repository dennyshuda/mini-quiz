import { IconArrowLeft, IconCheck, IconMail } from "@tabler/icons-react";
import { axiosInstance } from "lib/axios";
import { Form, redirect, useNavigation } from "react-router";
import { handleApiError } from "utils/error-handler";
import { getSession } from "~/session.server";
import type { Route } from "./+types/verify";
import { userContext } from "~/context";
import { authMiddleware } from "~/middleware/auth";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
	const user = context.get(userContext);

	if (user?.is_verified) {
		return redirect("/");
	}

	return;
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	const axios = axiosInstance(session.get("access_token"));

	try {
		const user = await axios.get("/auth/profile");

		if (user.data.data.is_verified) {
			return redirect("/");
		}

		return {
			success: false,
			message: "Email kamu terdeteksi belum diverifikasi. Silakan cek inbox/spam.",
		};
	} catch (err: any) {
		return handleApiError(err);
	}
}

export default function VerifyPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="w-full max-w-120 bg-white p-10 rounded-2xl shadow-2xl border border-slate-50 text-center">
				<div className="mx-auto size-24 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-8">
					<IconMail size={48} strokeWidth={1.5} />
				</div>
				<h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Cek Email!</h1>
				<p className="text-slate-500 font-medium mb-8">
					Kami telah mengirimkan link verifikasi. <br />
					Klik tombol di bawah jika kamu sudah melakukan verifikasi.
				</p>
				{actionData && !actionData.success && (
					<div className="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100 animate-shake">
						{actionData.message}
					</div>
				)}
				<Form method="post" className="space-y-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-100"
					>
						{isSubmitting ? (
							"Mengecek status..."
						) : (
							<>
								Saya Sudah Verifikasi
								<IconCheck size={18} />
							</>
						)}
					</button>

					<a
						href="https://mail.google.com"
						target="_blank"
						className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
					>
						Buka Gmail
					</a>
				</Form>
				<div className="mt-8 pt-6 border-t border-slate-50">
					<button className="text-sm font-bold text-slate-400 hover:text-indigo-600 inline-flex items-center gap-2 transition-colors">
						<IconArrowLeft size={16} /> Kembali ke Login
					</button>
				</div>
			</div>
		</div>
	);
}
