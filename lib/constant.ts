import { IconBook, IconHistory, IconUser } from "@tabler/icons-react";

export const ERROR_CODES = {
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
	VALIDATION_ERROR: "VALIDATION_ERROR",
	UNAUTHORIZED: "UNAUTHORIZED",
	SERVER_ERROR: "INTERNAL_SERVER_ERROR",
	NETWORK_ERROR: "NETWORK_ERROR",
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
	[ERROR_CODES.INVALID_CREDENTIALS]: "Email atau password yang kamu masukkan salah.",
	[ERROR_CODES.VALIDATION_ERROR]: "Data yang dikirim tidak valid.",
	[ERROR_CODES.UNAUTHORIZED]: "Sesi kamu telah berakhir, silakan login kembali.",
	[ERROR_CODES.SERVER_ERROR]: "Terjadi masalah pada server kami. Coba lagi nanti.",
	[ERROR_CODES.NETWORK_ERROR]: "Gagal terhubung ke server. Periksa koneksi internetmu.",
};

export const links = [
	{ label: "Kuis", href: "/", icon: IconBook },
	{ label: "Riwayat", href: "/quiz/history", icon: IconHistory },
	{ label: "Profil", href: "/quiz/@me", icon: IconUser },
];
