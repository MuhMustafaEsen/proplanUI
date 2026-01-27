import React, { createContext, useContext, useState } from "react";
import { authService } from "../api/auth.service";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

interface JwtPayload {
    nameid: number;
    email: string;
    role: string;
}

interface AuthUser {
    id: number;
    email: string;
    role: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

const normalizeRole = (role: any): string => {
    if (Array.isArray(role)) return role[0];
    if (typeof role === "string") return role;
    return "";
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUser({
                id: Number(decoded.nameid),
                email: decoded.email,
                role: normalizeRole(decoded.role)
            });
        } catch {
            try {
                const data = await authService.refresh();
                const decoded = jwtDecode<JwtPayload>(data.accessToken);

                setUser({
                    id:Number(decoded.nameid),
                    email:decoded.email,
                    role:normalizeRole(decoded.role),
                });
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
            } 
            //localStorage.removeItem("accessToken");
            //setUser(null);
        } finally {
            setLoading(false);
        }
    };
     initAuth();
}, []);

    const login = async (email: string, password: string): Promise<AuthUser> => {
        setLoading(true);

        try {
            const data = await authService.login(email, password);

            localStorage.setItem("accessToken", data.accessToken);

            const decoded = jwtDecode<JwtPayload>(data.accessToken);

            const loggedInUser: AuthUser = {
                id: Number(decoded.nameid),
                email: decoded.email,
                role: normalizeRole(decoded.role)
            };
            /* setUser({
            id:Number(decoded.nameid),
            email:decoded.email,
            role:normalizeRole(decoded.role)
        });*/

            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
        /*
       setUser({
           id:data.userId,
           email:data.email,
           role:data.role
       });
       */
    };

    const logout = async () => {
        await authService.logout();
        //localStorage.removeItem("accessToken");
        // authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

/*eskisi
interface AuthState {
user:any;
setUser: (u:any) => void;

}

const AuthContext = createContext<AuthState>(null!);

export const AuthProvider = ({ Children} : any) => {
    const [user,setUser] = useState(null);

    return(
        <AuthContext.Provider value={{user,setUser}}>{Children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
*/