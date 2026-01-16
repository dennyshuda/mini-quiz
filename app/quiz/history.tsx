import { IconCalendar, IconChartBar, IconChevronLeft, IconRotate } from "@tabler/icons-react";

const historyData = [
	{ id: 1, title: "Javascript ES6", date: "12 Jan 2024", score: 85, status: "Passed" },
	{ id: 2, title: "React Fundamentals", date: "10 Jan 2024", score: 40, status: "Failed" },
	{ id: 3, title: "CSS Tailwind", date: "05 Jan 2024", score: 100, status: "Passed" },
];

export default function QuizHistory() {
	return (
		<div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12">
			<div className="max-w-4xl mx-auto">
				<button className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-900 transition-colors">
					<IconChevronLeft className="size-5" /> Kembali ke List
				</button>

				<div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-50">
					<div className="p-8 border-b border-slate-50 flex justify-between items-center">
						<h1 className="text-2xl font-black text-slate-900">Riwayat Quiz</h1>
						<IconChartBar className="text-slate-300 size-8" />
					</div>

					<div className="divide-y divide-slate-50">
						{historyData.map((item) => (
							<div
								key={item.id}
								className="p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
							>
								<div className="flex gap-4 items-center">
									<div
										className={`size-14 rounded-2xl flex items-center justify-center font-black text-lg ${item.score >= 70 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
									>
										{item.score}
									</div>
									<div>
										<h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
										<div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
											<IconCalendar className="size-4" /> {item.date}
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<span
										className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${item.status === "Passed" ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-400"}`}
									>
										{item.status}
									</span>
									<button className="p-3 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 rounded-xl transition-all">
										<IconRotate className="size-5" />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
