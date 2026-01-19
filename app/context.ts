import type { IUser } from "interfaces/user";
import { createContext } from "react-router";

export const userContext = createContext<Omit<IUser, "created_at" | "updated_at"> | null>(null);
