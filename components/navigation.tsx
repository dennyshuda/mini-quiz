import { IconBook, IconLayout, IconLogout, IconMenu, IconUser, IconX } from "@tabler/icons-react";
import { useUser } from "context/UserContext";
import api from "lib/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { cn } from "utils/cn";

export function Navigation() {
	const { user } = useUser();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const res = await api.post("/auth/logout");
			console.log(res);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			localStorage.clear();
			navigate("/login");
		}
	};

	const navLinks = [
		{ name: "My Quizzes", href: "/", icon: IconBook },
		{ name: "History", href: "/quiz/history", icon: IconUser },
		{ name: "Profile", href: "/@me", icon: IconLayout },
	];

	return (
		<nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-20">
					<div className="flex items-center">
						<Link to="/" className="flex items-center gap-2">
							<div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 transition-transform">
								<IconBook size={24} />
							</div>
							<span className="text-xl font-black text-slate-900 tracking-tighter">
								QUIZ<span className="text-indigobg-indigo-600">APP</span>
							</span>
						</Link>
					</div>

					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								to={link.href}
								className="text-sm font-bold text-slate-500 hover:text-indigobg-indigo-600 transition-colors"
							>
								{link.name}
							</Link>
						))}
						<div className="h-6 w-px bg-slate-100" />
						<div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
							<div className="text-right">
								<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
									Student
								</p>
								<p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
							</div>
							<button
								onClick={handleLogout}
								className="size-10 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-xl flex items-center justify-center transition-all shadow-sm"
							>
								<IconLogout size={18} />
							</button>
						</div>
					</div>

					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-xl bg-slate-50 text-slate-600 outline-none"
						>
							{isOpen ? <IconX size={24} /> : <IconMenu size={24} />}
						</button>
					</div>
				</div>
			</div>

			<div
				className={cn(
					"md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300",
					isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
				)}
			>
				<div className="px-4 pt-2 pb-6 space-y-2">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							to={link.href}
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 px-4 py-4 text-base font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigobg-indigo-600 rounded-2xl transition-all"
						>
							<link.icon size={20} />
							{link.name}
						</Link>
					))}
					<div className="pt-4 mt-4 border-t border-slate-50">
						<button
							onClick={handleLogout}
							className="w-full flex items-center gap-3 px-4 py-4 text-base font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
						>
							<IconLogout size={20} />
							Keluar
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
