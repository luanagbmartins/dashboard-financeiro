import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem("@dashboard-financeiro:logged");
        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if (email === "luana@email.com" && password === "1234") {
            localStorage.setItem("@dashboard-financeiro:logged", "true");
            setLogged(true);
        } else {
            alert("Senha ou usuário inválidos");
        }
    };

    const signOut = () => {
        localStorage.removeItem("@dashboard-financeiro:logged");
        setLogged(false);
    };

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
