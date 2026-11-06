import React from "react";
import type { User } from "../types/user";
import api from "../api";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
    user: User | null,
    checkingAuth: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}){

    const [user, setUser] = React.useState<User | null>(null);
    const [checkingAuth, setCheckinAuth] = React.useState(true);

    // const navigate = useNavigate();
  
    React.useEffect(() => {
      api.get("auth/me")
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setCheckinAuth(false))
    }, [])

    const login = async (email: string, password: string) => {
        try {
            await api.post("auth/signin", {email, password});
            const res = await api.get("auth/me");
            setUser(res.data);
            // navigate('/admin');
        } catch (error) {
            console.error("Erreur de connexion : ", error);
        }
    }

    const logout = async () => {
        await api.post("auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value = {{user, checkingAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
  
}

export function useAuth(){
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth doit être utilisé dans <AuthProvider>");
    }
    return context;

}