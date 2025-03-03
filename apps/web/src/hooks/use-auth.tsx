import { Spinner } from "@/components/layout/spinner";
import { api } from "@/utils/api-client";
import type { User } from "@bytemart/types";
import { createContext, use, useEffect, useState } from "react";

export type AuthContextType = {
	user: User | null;
	status: "loading" | "error" | "success";
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
	children,
}: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthContextType["user"]>(null);
	const [status, setStatus] = useState<AuthContextType["status"]>("loading");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await api.get("auth/me");
				setUser(res.data);
				setStatus("success");
			} catch (error) {
				console.error(error);
				setStatus("error");
			}
		};
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				status,
				isAuthenticated: !!user,
				setUser,
			}}
		>
			{status === "loading" ? (
				<div className="h-dvh flex justify-center items-center">
					<Spinner variant="circle" />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const ctx = use(AuthContext);
	if (ctx === undefined) {
		throw new Error("useAuth must be used within an AuthContextProvider");
	}
	return ctx;
};
