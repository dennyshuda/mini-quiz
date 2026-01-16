import type { Icon } from "@tabler/icons-react";
import { type InputHTMLAttributes } from "react";
import { cn } from "utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: Icon;
	error?: string | null;
}

export function Input({ label, icon: Icon, error, ...props }: InputProps) {
	return (
		<div className="space-y-1.5 w-full">
			{label && (
				<label className="text-sm font-bold text-slate-700 ml-1">
					{label} {props.required && <span className="text-red-500">*</span>}
				</label>
			)}

			<div className="relative group">
				{Icon && (
					<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
						<Icon size={20} />
					</div>
				)}

				<input
					{...props}
					className={cn(
						" w-full py-3.5 bg-slate-50 border transition-all outline-none rounded-2xl",
						Icon ? "pl-12 pr-4" : "px-5",
						error
							? "border-red-400 focus:ring-4 focus:ring-red-50"
							: "border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-[#4F46E5]"
					)}
				/>
			</div>

			{error && (
				<p className="text-xs font-semibold text-red-500 ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
					{error}
				</p>
			)}
		</div>
	);
}
