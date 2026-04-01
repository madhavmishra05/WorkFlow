import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export type UserRole = "admin" | "hr" | "employee";

export interface AuthUser {
  role: UserRole;
  userName: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const userDefaults: Record<UserRole, AuthUser> = {
  admin: { role: "admin", userName: "Rajesh Kumar", email: "admin@workflow.com", avatar: "https://i.pravatar.cc/150?img=12" },
  hr:    { role: "hr",    userName: "Priya Sharma",  email: "hr@workflow.com",    avatar: "https://i.pravatar.cc/150?img=5" },
  employee: { role: "employee", userName: "Sarah Johnson", email: "sarah@workflow.com", avatar: "https://i.pravatar.cc/150?img=1" },
};

const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: UserRole) => {
    const userData = userDefaults[role];
    setUser(userData);
    toast.success(`Welcome back, ${userData.userName}! 👋`, {
      description: role !== "employee"
        ? "You have 3 pending leave requests and 2 unread notifications."
        : "You have 2 unread notifications.",
      duration: 5000,
    });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
