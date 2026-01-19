import { useState, useEffect } from "react";
import { IconClock } from "@tabler/icons-react";
import { cn } from "utils/cn";

interface QuizTimerProps {
	expiresAt: string;
	onTimeUp: () => void;
}

export function QuizTimer({ expiresAt, onTimeUp }: QuizTimerProps) {
	const [timeLeft, setTimeLeft] = useState<string>("--:--");
	const [isUrgent, setIsUrgent] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const diff = new Date(expiresAt).getTime() - Date.now();

			if (diff <= 0) {
				clearInterval(interval);
				setTimeLeft("00:00");
				onTimeUp();
			} else {
				const m = Math.floor(diff / 60000);
				const s = Math.floor((diff % 60000) / 1000);
				setTimeLeft(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [expiresAt]);

	return (
		<div
			className={cn(
				"flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-lg font-black transition-all duration-300",
				isUrgent
					? "bg-red-500 text-white animate-pulse"
					: "bg-slate-900 text-white shadow-lg shadow-slate-200"
			)}
		>
			<IconClock size={20} />
			{timeLeft}
		</div>
	);
}
