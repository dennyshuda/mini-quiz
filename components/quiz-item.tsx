import { IconArrowRight, IconBook, IconClock } from "@tabler/icons-react";
import type { IQuiz } from "interfaces/quiz";
import { Link } from "react-router";

export function QuizItem({ quiz }: { quiz: IQuiz }) {
	return (
		<div
			key={quiz.id}
			className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
		>
			<div className="flex justify-between items-start mb-6">
				<div className="size-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
					<IconBook size={28} />
				</div>
				{quiz.is_active && (
					<span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
						<span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
						Aktif
					</span>
				)}
			</div>

			<div className="flex-1">
				<h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
					{quiz.name}
				</h3>
				<p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-6">
					{quiz.description}
				</p>
			</div>

			<div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
				<div className="flex items-center gap-1 text-slate-400 font-bold text-xs uppercase tracking-tighter">
					<IconClock size={18} className="text-slate-300" />
					{new Intl.DateTimeFormat("id-ID", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					}).format(new Date(quiz.updated_at))}
				</div>

				<Link
					to={`/quiz/${quiz.id}`}
					className="size-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-indigotext-indigo-600 transition-all duration-300 shadow-lg shadow-slate-200 active:scale-90"
				>
					<IconArrowRight size={20} />
				</Link>
			</div>

			<div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-indigotext-indigo-600/2 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
		</div>
	);
}
