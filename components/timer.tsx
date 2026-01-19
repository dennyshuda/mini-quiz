import { useState, useEffect } from "react";
import { IconClock } from "@tabler/icons-react";

interface QuizTimerProps {
	expiresAt: string;
	onTimeUp: () => void;
}

export function QuizTimer({ expiresAt, onTimeUp }: QuizTimerProps) {
	const [timeLeft, setTimeLeft] = useState<string>("--:--");
	const [isUrgent, setIsUrgent] = useState(false);

	useEffect(() => {
		const targetTime = new Date(expiresAt).getTime();

		const calculate = () => {
			const now = new Date().getTime();
			const diff = targetTime - now;

			if (diff <= 0) {
				setTimeLeft("00:00");
				onTimeUp();
				return false;
			}

			const minutes = Math.floor(diff / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			if (minutes < 1) setIsUrgent(true);

			setTimeLeft(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
			return true;
		};

		const interval = setInterval(calculate, 1000);
		calculate();

		return () => clearInterval(interval);
	}, [expiresAt, onTimeUp]);

	return (
		<div
			className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-lg font-black transition-all duration-300 ${
				isUrgent
					? "bg-red-500 text-white animate-pulse"
					: "bg-slate-900 text-white shadow-lg shadow-slate-200"
			}`}
		>
			<IconClock size={20} />
			{timeLeft}
		</div>
	);
}
