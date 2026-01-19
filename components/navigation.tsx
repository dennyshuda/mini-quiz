import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import type { IUser } from "interfaces/user";
import { links } from "lib/constant";
import { useState } from "react";
import { Link, useSubmit } from "react-router";
import { cn } from "utils/cn";

export function Navigation({ user }: { user: Omit<IUser, "created_at" | "updated_at"> | null }) {
	const [isOpen, setIsOpen] = useState(false);

	const submit = useSubmit();

	return (
		<nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-2 group">
					<span className="text-lg font-black tracking-tight text-slate-900">
						QUIZ<span className="text-indigo-600">APP</span>
					</span>
				</Link>

				<div className="relative">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
					>
						<div className="text-right hidden sm:block">
							<p className="text-sm font-bold text-slate-800 leading-none mb-0.5">{user?.name}</p>
							<p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
								{user?.email}
							</p>
						</div>
						<div className="size-9 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-sm">
							{user?.name.charAt(0)}
						</div>

						<IconChevronDown
							size={14}
							className={cn(
								"text-slate-400 transition-transform duration-300",
								isOpen && "rotate-180"
							)}
						/>
					</button>

					{isOpen && (
						<>
							<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

							<div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
								<div className="px-3 py-2 mb-2">
									<p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
										Account
									</p>
								</div>

								{links.map(({ label, icon: Icon, href }, index) => (
									<Link
										key={index}
										to={href}
										className="flex items-center gap-3 p-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
									>
										<Icon size={18} className="text-slate-400" />
										{label}
									</Link>
								))}

								<div className="h-px bg-slate-100 my-2 mx-2" />

								<button
									onClick={() => submit(null, { method: "post", action: "/logout" })}
									className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
								>
									<IconLogout size={18} />
									Sign Out
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
