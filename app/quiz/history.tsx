import { IconCalendar, IconChevronRight, IconTrophy } from "@tabler/icons-react";
import { axiosInstance } from "lib/axios";
import { Link } from "react-router";
import { getSession } from "~/session.server";
import type { Route } from "./+types/history";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));

	const response = await axios.get("/quiz/history");
	return response.data.data;
}

export default function QuizHistoryPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className="min-h-screen bg-[#F8FAFC] p-6 pb-20">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-black text-slate-900 mb-8">Riwayat Kuis</h1>

				<div className="space-y-4">
					{loaderData.results?.length > 0 ? (
						loaderData.results.map((item: any) => (
							<Link
								key={item.id}
								to={`/quiz/history/${item.session_id}`}
								className="group block bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-5">
										<div className="size-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
											<IconTrophy size={28} />
										</div>
										<div>
											<h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
												{item.subtest_name}
											</h3>
											<div className="flex items-center gap-3 text-slate-400 text-sm mt-1 font-medium">
												<span className="flex items-center gap-1">
													<IconCalendar size={14} />
													{new Date(item.completed_at).toLocaleDateString("id-ID")}
												</span>
												<span>•</span>
												<span className="text-indigo-600 font-bold">Skor: {item.percentage}</span>
											</div>
										</div>
									</div>
									<IconChevronRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
								</div>
							</Link>
						))
					) : (
						<div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
							<p className="text-slate-400 font-medium">Belum ada riwayat kuis.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
