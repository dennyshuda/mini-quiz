import { IconLoader2 } from "@tabler/icons-react";
import { QuizTimer } from "components/timer";
import { axiosInstance } from "lib/axios";
import { useCallback, useEffect, useState } from "react";
import { Form, redirect, useNavigation, useSubmit } from "react-router";
import { getSession } from "~/session.server";
import type { Route } from "./+types/attempt";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	const axios = axiosInstance(session.get("access_token"));
	try {
		const response = await axios.get(`/quiz/active`);
		return response.data.data;
	} catch (err) {
		return redirect("/");
	}
}

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));

	const formData = await request.formData();

	const rawAnswers = formData.get("answers") as string;

	try {
		const response = await axios.post(`/quiz/submit`, { answers: JSON.parse(rawAnswers) });

		const id = response.data.data.session_id;
		return redirect(`/quiz/history/${id}`);
	} catch (err) {
		return { error: "Gagal mengirim jawaban. Silakan coba lagi." };
	}
}

export default function QuizPlay({ loaderData }: Route.ComponentProps) {
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [isTimeUp, setIsTimeUp] = useState(false);

	const handleSelect = useCallback((qNumber: number, optionText: string) => {
		setAnswers((prev) => ({
			...prev,
			[qNumber]: optionText,
		}));
	}, []);

	const navigation = useNavigation();
	const submit = useSubmit();
	const isSubmitting = navigation.state === "submitting";

	const handleAutoSubmit = () => {
		const form = new FormData();
		const finalAnswers: Record<number, string> = {};

		loaderData?.questions.forEach((q: any) => {
			const questionNum = q.question_number;
			finalAnswers[questionNum] = answers[questionNum] || "";
		});

		form.append("answers", JSON.stringify(finalAnswers));

		submit(form, { action: "/quiz/attempt", method: "POST" });
	};

	useEffect(() => {
		if (isTimeUp) {
			handleAutoSubmit();
		}
	}, [isTimeUp]);

	return (
		<div className="min-h-screen bg-slate-50">
			<header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4">
				<div className="max-w-3xl mx-auto flex justify-between items-center">
					<div>
						<h1 className="font-black text-slate-900">{loaderData.subtest_name || "Sesi Quiz"}</h1>
						<p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
							{Object.keys(answers).length} dari {loaderData.questions.length} Terjawab
						</p>
					</div>

					<QuizTimer expiresAt={loaderData.expires_at} onTimeUp={() => setIsTimeUp(true)} />
				</div>
			</header>

			<main className="max-w-3xl mx-auto p-6 space-y-6">
				{loaderData.questions.map((q: any) => (
					<div
						key={q.question_number}
						className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60"
					>
						<div className="flex gap-4 mb-8">
							<span className="flex-none size-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">
								{q.question_number}
							</span>
							<div className="text-slate-800 text-lg font-medium leading-relaxed pt-1">
								{q.question_text}
							</div>
						</div>

						<div className="grid gap-3">
							{q.options.map((option: string, idx: number) => {
								const label = String.fromCharCode(65 + idx);
								const isSelected = answers[q.question_number] === label;

								return (
									<button
										key={idx}
										type="button"
										onClick={() => handleSelect(q.question_number, label)}
										className={`group relative flex items-center p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
											isSelected
												? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100"
												: "border-slate-100 hover:border-slate-300 bg-white"
										}`}
									>
										<div
											className={`size-8 rounded-xl flex items-center justify-center font-bold mr-4 transition-colors ${
												isSelected
													? "bg-indigo-600 text-white"
													: "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
											}`}
										>
											{label}
										</div>
										<span
											className={`font-semibold ${isSelected ? "text-indigo-900" : "text-slate-600"}`}
										>
											{option}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				))}

				<div className="py-12 flex flex-col items-center">
					<Form method="POST" className="w-full">
						<input type="hidden" name="answers" value={JSON.stringify(answers)} />

						<button
							type="submit"
							disabled={isSubmitting || Object.keys(answers).length < 10}
							className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xl shadow-xl shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
						>
							{isSubmitting ? (
								<>
									<IconLoader2 className="animate-spin" />
									Mengirim Jawaban...
								</>
							) : Object.keys(answers).length < 10 ? (
								`Selesaikan ${10 - Object.keys(answers).length} Soal Lagi`
							) : (
								"Selesaikan Quiz"
							)}
						</button>
					</Form>
					<p className="mt-4 text-slate-400 font-medium text-sm text-center px-10">
						Pastikan Anda telah memeriksa kembali semua jawaban sebelum menekan tombol selesai.
					</p>
				</div>
			</main>
		</div>
	);
}
