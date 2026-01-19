import { IconClock, IconHourglassHigh, IconTarget, IconTrophy } from "@tabler/icons-react";
import { axiosInstance } from "lib/axios";
import { Link } from "react-router";
import { getSession } from "~/session.server";
import type { Route } from "./+types/result";

export async function loader({ params, request }: Route.LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const axios = axiosInstance(session.get("access_token"));

	const response = await axios.get(`/quiz/result/${params.id}`);

	return response.data.data;
}

export default function HistoryDetailPage({ loaderData }: Route.ComponentProps) {
	console.log(loaderData);

	const { result } = loaderData;

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}m ${secs}s`;
	};

	return (
		<div className="min-h-screen bg-[#F8FAFC] pb-20">
			<div className="max-w-3xl mx-auto px-6 mt-10 ">
				<div className="text-center bg-indigo-600 text-white rounded-[2.5rem] p-10 mb-10">
					<p className="text-indigo-200 uppercase font-black tracking-[0.2em] text-xs mb-4">
						Hasil Akhir Subtest
					</p>
					<h1 className="text-4xl md:text-5xl font-black mb-2">{result.subtest_name}</h1>
					<p className="text-indigo-100/80 font-medium">
						Diselesaikan pada{" "}
						{new Date(result.completed_at).toLocaleString("id-ID", {
							dateStyle: "long",
							timeStyle: "short",
						})}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col items-center justify-center">
						<div className="size-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
							<IconTrophy size={32} />
						</div>
						<p className="text-4xl font-black text-slate-900">{result.score}</p>
						<p className="text-slate-400 text-xs font-bold uppercase mt-1">Total Skor</p>
					</div>

					<div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col items-center justify-center">
						<div className="size-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
							<IconTarget size={32} />
						</div>
						<p className="text-4xl font-black text-slate-900">{result.percentage}%</p>
						<p className="text-slate-400 text-xs font-bold uppercase mt-1">Akurasi</p>
					</div>

					<div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col items-center justify-center">
						<div className="size-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
							<IconClock size={32} />
						</div>
						<p className="text-xl font-black text-slate-900">
							{formatTime(result.total_time_seconds)}
						</p>
						<p className="text-slate-400 text-xs font-bold uppercase mt-1">Total Waktu</p>
					</div>
				</div>

				<div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 overflow-hidden">
					<h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
						<IconHourglassHigh className="text-indigo-600" /> Statistik Pengerjaan
					</h3>

					<div className="space-y-6">
						<div className="flex justify-between items-center pb-4 border-b border-slate-50">
							<span className="text-slate-500 font-medium">Benar / Total Soal</span>
							<span className="font-bold text-slate-800">
								{result.correct_answers} / {result.total_questions}
							</span>
						</div>
						<div className="flex justify-between items-center pb-4 border-b border-slate-50">
							<span className="text-slate-500 font-medium">Rata-rata waktu per soal</span>
							<span className="font-bold text-slate-800">
								{result.average_time_per_question} detik
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-slate-500 font-medium">Status</span>
							<span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase">
								Completed
							</span>
						</div>
					</div>
				</div>

				<div className="mt-10 flex gap-4">
					<Link
						to="/"
						className="flex-1 bg-white text-slate-900 border-2 border-slate-200 py-4 rounded-2xl font-bold text-center hover:bg-slate-50 transition-colors"
					>
						Ke Beranda
					</Link>
					<Link
						to="/subtests"
						className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors"
					>
						Coba Subtest Lain
					</Link>
				</div>
			</div>
		</div>
	);
}
