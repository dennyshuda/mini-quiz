import { IconTrophy } from "@tabler/icons-react";
import { QuizItem } from "components/quiz-item";
import type { IQuiz } from "interfaces/quiz";
import api from "lib/axios";
import type { Route } from "./+types/home";

interface Props {
	data: IQuiz[];
}

export async function clientLoader() {
	const res = await api.get("/subtests");
	return res.data;
}

export default function QuizHomePage({ loaderData }: Route.ComponentProps) {
	const { data: quizzes }: Props = loaderData;

	return (
		<div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12">
			<div className="max-w-6xl mx-auto">
				<header className="flex justify-between items-center mb-10">
					<div className="flex flex-col">
						<h2 className="text-3xl font-black text-slate-900 tracking-tight">
							Pilih <span className="text-indigo-600">Modul Belajar</span>
						</h2>
						<p className="text-slate-500 font-medium mt-2">
							Tingkatkan kemampuanmu dengan latihan soal berkualitas.
						</p>
					</div>

					<button className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
						<IconTrophy className="size-5" />
						Lihat History
					</button>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{quizzes.map((quiz) => (
						<QuizItem key={quiz.id} quiz={quiz} />
					))}
				</div>
			</div>
		</div>
	);
}
