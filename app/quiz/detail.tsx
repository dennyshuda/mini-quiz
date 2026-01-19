import {
	IconAlertCircle,
	IconAlertTriangle,
	IconArrowLeft,
	IconPlayerPlay,
	IconRefresh,
} from "@tabler/icons-react";
import { axiosInstance } from "lib/axios";
import { Form, Link, redirect, useNavigation } from "react-router";
import { getSession } from "~/session.server";
import type { Route } from "./+types/detail";
import { cn } from "utils/cn";
import { rules } from "lib/constant";

export async function loader({ params, request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));

	try {
		const [listRes, activeRes] = await Promise.all([
			await axios.get("/subtests"),
			await axios.get("/quiz/active").catch(() => ({ data: { data: null } })),
		]);

		const subtest = listRes.data.data.find((s: any) => s.id === params.id);
		const activeQuiz = activeRes?.data?.data;
		const isSameSubtest = activeQuiz && subtest ? activeQuiz.subtest_name === subtest.name : false;

		if (!subtest) {
			throw new Error("Subtest tidak ditemukan");
		}

		return {
			subtest,
			activeQuiz,
			isSameSubtest,
		};
	} catch (err) {
		console.error("Loader Error:", err);
		return redirect("/");
	}
}

export async function action({ params, request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));
	try {
		await axios.get(`/quiz/start/${params.id}`);
		return redirect("/quiz/attempt");
	} catch (err: any) {
		return { error: "Terjadi kesalahan saat memulai kuis." };
	}
}

export default function QuizDetailPage({ loaderData }: Route.ComponentProps) {
	const { subtest, activeQuiz, isSameSubtest } = loaderData;
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	console.log(loaderData);

	return (
		<div className="min-h-screen bg-slate-50 p-6">
			<div className="max-w-2xl mx-auto">
				<Link
					to="/"
					className="flex items-center gap-2 text-slate-500 mb-8 hover:text-indigo-600 transition-colors"
				>
					<IconArrowLeft size={20} /> Kembali ke Kuis
				</Link>

				<div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
					<h1 className="text-3xl font-black text-slate-900 mb-2">{subtest.name}</h1>
					<p className="text-slate-500 font-medium mb-10">
						Harap baca instruksi dengan teliti sebelum memulai.
					</p>

					<div className="grid grid-cols-2 gap-4 mb-10">
						<div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
							<p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
								Jumlah Soal
							</p>
							<p className="text-lg font-black text-slate-700">10 Butir</p>
						</div>
						<div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
							<p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
								Waktu Pengerjaan
							</p>
							<p className="text-lg font-black text-slate-700">10 Menit</p>
						</div>
					</div>

					<div className="space-y-4 mb-10">
						<h3 className="font-bold text-slate-800 flex items-center gap-2">
							<IconAlertCircle size={20} className="text-indigo-600" />
							Aturan Pengerjaan
						</h3>

						<ul className="space-y-3">
							{rules.map((text, idx) => (
								<li
									key={idx}
									className="flex gap-3 text-sm font-medium text-slate-600 leading-relaxed"
								>
									<span className="flex-none size-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">
										{idx + 1}
									</span>
									{text}
								</li>
							))}
						</ul>
					</div>

					{activeQuiz && (
						<div
							className={cn(
								"p-6 rounded-3xl mb-8 border-2",
								isSameSubtest ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"
							)}
						>
							<div className="flex gap-4">
								<IconAlertTriangle
									className={cn(isSameSubtest ? "text-amber-600" : "text-red-600")}
									size={28}
								/>
								<div>
									<h3
										className={cn("font-bold", isSameSubtest ? "text-amber-900" : "text-red-900")}
									>
										{isSameSubtest ? "Lanjutkan Sesi Anda" : "Selesaikan Sesi Lain"}
									</h3>
									<p
										className={cn(
											"text-sm mt-1 font-medium",
											isSameSubtest ? "text-amber-700" : "text-red-700"
										)}
									>
										{isSameSubtest
											? "Anda masih memiliki kuis yang belum selesai di subtest ini. Timer tetap berjalan."
											: `Anda tidak bisa memulai kuis ini karena kuis subtest "${activeQuiz.subtest_name}" masih aktif.`}
									</p>
								</div>
							</div>
						</div>
					)}

					<div className="mt-6">
						{isSameSubtest ? (
							<Link
								to="/quiz/attempt"
								className="w-full bg-amber-500 hover:bg-amber-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-100 transition-all active:scale-95"
							>
								<IconRefresh size={24} /> Lanjutkan Kuis
							</Link>
						) : activeQuiz ? (
							<div className="space-y-2">
								<Link
									to="/quiz/attempt"
									className="w-full bg-amber-500 hover:bg-amber-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-100 transition-all active:scale-95"
								>
									Lanjutkan Kuis {activeQuiz.subtest_name}
								</Link>
								<button
									disabled
									className="w-full bg-slate-200 text-slate-400 py-5 rounded-2xl font-black text-xl cursor-not-allowed"
								>
									Selesaikan Kuis Lain Dulu
								</button>
							</div>
						) : (
							<Form method="POST">
								<button
									type="submit"
									disabled={isSubmitting}
									className={cn(
										"w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 transition-all active:scale-95",
										isSubmitting && "cursor-not-allowed"
									)}
								>
									{isSubmitting ? (
										"Menyiapkan..."
									) : (
										<>
											<IconPlayerPlay size={24} /> Mulai Sekarang
										</>
									)}
								</button>
							</Form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
