import { IconLoader2, IconLock, IconMail, IconShieldLock, IconUser } from "@tabler/icons-react";
import { Form, useNavigation } from "react-router";

export default function ProfilePage() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="min-h-screen bg-[#F8FAFC] p-6 pb-20">
			<div className="max-w-2xl mx-auto space-y-6">
				<header className="mb-8">
					<h1 className="text-3xl font-black text-slate-900">Pengaturan Profil</h1>
					<p className="text-slate-500 font-medium">Kelola informasi akun dan keamanan Anda</p>
				</header>

				<section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
					<div className="flex items-center gap-3 mb-8">
						<div className="size-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
							<IconUser size={22} />
						</div>
						<h2 className="text-xl font-black text-slate-800">Informasi Dasar</h2>
					</div>

					<Form method="put" className="space-y-5">
						<input type="hidden" name="intent" value="update_profile" />

						<div className="space-y-2">
							<label className="text-xs font-black text-slate-400 uppercase ml-1">
								Nama Lengkap
							</label>
							<div className="relative">
								<IconUser
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									size={20}
								/>
								<input
									name="name"
									className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-semibold"
									placeholder="Nama Anda"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-black text-slate-400 uppercase ml-1">
								Alamat Email
							</label>
							<div className="relative">
								<IconMail
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									size={20}
								/>
								<input
									name="email"
									type="email"
									className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-semibold"
									placeholder="email@contoh.com"
								/>
							</div>
						</div>

						<button
							disabled={isSubmitting}
							className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
						>
							{isSubmitting ? <IconLoader2 className="animate-spin mx-auto" /> : "Simpan Perubahan"}
						</button>
					</Form>
				</section>

				<section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
					<div className="flex items-center gap-3 mb-8">
						<div className="size-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
							<IconShieldLock size={22} />
						</div>
						<h2 className="text-xl font-black text-slate-800">Keamanan</h2>
					</div>

					<Form method="post" className="space-y-5">
						<input type="hidden" name="intent" value="change_password" />

						<div className="space-y-2">
							<label className="text-xs font-black text-slate-400 uppercase ml-1">
								Password Saat Ini
							</label>
							<div className="relative">
								<IconLock
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									size={20}
								/>
								<input
									name="old_password"
									type="password"
									className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all font-semibold"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-black text-slate-400 uppercase ml-1">
								Password Baru
							</label>
							<div className="relative">
								<IconLock
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
									size={20}
								/>
								<input
									name="new_password"
									type="password"
									className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all font-semibold"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							disabled={isSubmitting}
							className="w-full bg-amber-500 text-white py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all active:scale-95 disabled:opacity-50"
						>
							{isSubmitting ? <IconLoader2 className="animate-spin mx-auto" /> : "Ganti Password"}
						</button>
					</Form>
				</section>
			</div>
		</div>
	);
}
