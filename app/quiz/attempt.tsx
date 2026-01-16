import { IconChevronLeft, IconSend, IconTimeDuration0 } from "@tabler/icons-react";
import { useState } from "react";
import { getActiveQuiz } from "services/quiz-service";
import type { Route } from "./+types/attempt";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	// Cek apakah ada kuis aktif sebelum user mulai yang baru
	const activeQuiz = await getActiveQuiz();

	//   if (activeQuiz) {
	//     // Jika ada kuis aktif, paksa user kembali ke kuis tersebut
	//     throw redirect(`/quiz/${activeQuiz.id}`);
	//   }

	return activeQuiz;
}

export default function QuizPlay({ loaderData }: Route.ComponentProps) {
	console.log(loaderData);

	const [current, setCurrent] = useState(1);
	const total = 10;

	return (
		<div className="min-h-screen bg-white flex flex-col">
			{/* Header & Progress */}
			<div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
				<div className="flex items-center gap-3">
					<div className="font-black text-xl text-[#4F46E5]">QuizMaster.</div>
					<div className="h-6 w-px bg-slate-200 hidden md:block"></div>
					<span className="hidden md:block text-slate-500 font-medium">Frontend Development</span>
				</div>
				<div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-2xl font-bold">
					<IconTimeDuration0 className="size-5" /> 14:20
				</div>
			</div>

			<div className="w-full bg-slate-100 h-1.5">
				<div
					className="bg-[#06B6D4] h-full transition-all duration-500"
					style={{ width: `${(current / total) * 100}%` }}
				></div>
			</div>

			{/* Area Soal */}
			<main className="flex-1 max-w-3xl mx-auto w-full p-8 md:p-12">
				<div className="mb-10">
					<span className="text-sm font-bold text-[#4F46E5] uppercase tracking-widest">
						Pertanyaan {current} dari {total}
					</span>
					<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 leading-tight">
						Apa fungsi utama dari `useEffect` hook pada React?
					</h2>
				</div>

				<div className="space-y-4">
					{[
						"Mengelola state lokal",
						"Menangani side-effect seperti API call",
						"Mempercepat rendering DOM",
						"Hanya untuk memanggil class component",
					].map((ans, i) => (
						<label
							key={i}
							className="group flex items-center p-5 border-2 border-slate-100 rounded-3xl hover:border-[#4F46E5] hover:bg-indigo-50/30 cursor-pointer transition-all active:scale-[0.99]"
						>
							<input type="radio" name="answer" className="size-5 accent-[#4F46E5]" />
							<span className="ml-4 font-semibold text-slate-700 group-hover:text-slate-900">
								{ans}
							</span>
						</label>
					))}
				</div>
			</main>

			{/* Footer Navigasi */}
			<footer className="border-t border-slate-100 p-6">
				<div className="max-w-3xl mx-auto flex justify-between gap-4">
					<button
						onClick={() => setCurrent((prev) => Math.max(1, prev - 1))}
						className="flex items-center gap-2 px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-colors"
					>
						<IconChevronLeft /> Back
					</button>

					{current === total ? (
						<button className="bg-[#06B6D4] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-cyan-100 hover:bg-[#0891B2]">
							Selesaikan Quiz <IconSend className="size-4" />
						</button>
					) : (
						<button
							onClick={() => setCurrent((prev) => Math.min(total, prev + 1))}
							className="bg-[#4F46E5] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-[#4338CA]"
						>
							Next Question <IconChevronLeft className="size-4" />
						</button>
					)}
				</div>
			</footer>
		</div>
	);
}
