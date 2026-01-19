import { IconClipboardList } from "@tabler/icons-react";
import { QuizItem } from "components/quiz-item";
import type { IQuiz } from "interfaces/quiz";
import { axiosInstance } from "lib/axios";
import { getSession } from "~/session.server";
import type { Route } from "./+types/home";

interface QuizResponse {
	data: IQuiz[];
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));

	const res = await axios.get("/subtests");
	return res.data;
}

export default function QuizHomePage({ loaderData }: Route.ComponentProps) {
	const { data: quizzes }: QuizResponse = loaderData;

	return (
		<div className="min-h-screen bg-slate-50 p-6 lg:p-12">
			<div className="max-w-6xl mx-auto">
				<header className="flex flex-col mb-10">
					<h2 className="text-3xl font-black text-slate-900 tracking-tight">
						Pilih <span className="text-indigo-600">Modul Belajar</span>
					</h2>
					<p className="text-slate-500 font-medium mt-2">
						Tingkatkan kemampuanmu dengan latihan soal berkualitas.
					</p>
				</header>

				{quizzes.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{quizzes.map((quiz) => (
							<QuizItem key={quiz.id} quiz={quiz} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
						<div className="size-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-6">
							<IconClipboardList size={40} strokeWidth={1.5} />
						</div>

						<h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada kuis</h3>
						<p className="text-slate-500 text-center max-w-sm mb-8">
							Saat ini belum ada kuis yang tersedia untuk kamu kerjakan. Silakan cek kembali nanti
							atau hubungi admin.
						</p>

						<button
							onClick={() => window.location.reload()}
							className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
						>
							Segarkan Halaman
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
