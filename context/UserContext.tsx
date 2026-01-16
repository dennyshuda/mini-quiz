import type { IUser } from "interfaces/user";
import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
	user: Omit<IUser, "created_at" | "updated_at">;
	setUser: (user: IUser) => void;
}

const UserContext = createContext<UserContextType | null>(null);

// const initialUser: Omit<IUser, "created_at" | "updated_at"> = {
// 	id: "",
// 	email: "",
// 	name: "",
// 	role: "",
// 	is_verified: false,
// };

export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser: any }) {
	const [user, setUser] = useState(initialUser);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within UserProvider");
	return context;
};
