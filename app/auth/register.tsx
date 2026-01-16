import { IconAlertCircle, IconLoader, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { registerAction } from "actions/auth";
import { Input } from "components/input";
import { useActionState } from "react";
import { Link } from "react-router";

export default function RegisterPage() {
	const [state, formAction, isPending] = useActionState(registerAction, {
		success: false,
		message: null,
		code: undefined,
	});

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
				<div className="mb-10 text-center">
					<h1 className="text-3xl font-black tracking-tight">Daftar Akun</h1>
					<p className="text-slate-500 mt-2 font-medium">Mulai perjalanan ambisiusmu sekarang.</p>
				</div>

				{state.message && !state.success && (
					<div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl animate-shake">
						<IconAlertCircle size={18} className="shrink-0" />
						<span className="text-sm font-bold">{state.message}</span>
					</div>
				)}

				<form action={formAction} className="space-y-6">
					<Input
						label="Nama Lengkap"
						name="name"
						icon={IconUser}
						required
						placeholder="Bahlil Lahadalia"
					/>

					<Input
						label="Email"
						name="email"
						type="email"
						icon={IconMail}
						required
						placeholder="sawit@example.com"
					/>

					<Input
						label="Password"
						name="password"
						type="password"
						icon={IconMail}
						required
						placeholder="••••••••"
					/>

					<button
						type="submit"
						disabled={isPending}
						className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95"
					>
						{isPending ? <IconLoader className="size-5" /> : <IconLock className="size-5" />} Daftar
					</button>
				</form>

				<p className="mt-8 text-center text-slate-500 font-medium text-sm">
					Sudah punya akun?{" "}
					<Link to="/login" className="text-[#4F46E5] font-bold hover:underline">
						Masuk disini
					</Link>
				</p>
			</div>
		</div>
	);
}
