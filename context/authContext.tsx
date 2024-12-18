"use client";
import {
    AuthContextType,
    AuthProviderProps,
    TokenType,
} from "@/types/authTypes";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const cookies = new Cookies();
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string>("");
    const [uid, setUid] = useState<string>("");
    const [isLoggedIn, setIsloggedIn] = useState<boolean>(false);
    const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
    useEffect(() => {
        const token = cookies.get("token");
        if (token) {
            const parts = token.split(".");
            if (parts.length === 3) {
                try {
                    const decodedToken: TokenType = jwtDecode(token);
                    setUsername(decodedToken.username);
                    setUid(decodedToken.uid);
                    setIsloggedIn(true);
                    setIsLoadingState(false);
                } catch (err) {
                    console.log(err);
                    resetSessionData();
                }
            } else {
                console.log("Invalid token format");
                resetSessionData();
            }
        } else {
            resetSessionData();
        }
        setIsLoadingState(false);
    }, []);

    function resetSessionData() {
        cookies.remove("token", { path: "/" });
        setUsername("");
        setUid("");
        setIsloggedIn(false);
    }

    function login(token: string) {
        try {
            const parts = token.split(".");
            if (parts.length === 3) {
                cookies.set("token", token, { path: "/" });
                const decoded: TokenType = jwtDecode(token);
                setUsername(decoded.username);
                setUid(decoded.uid);
                setIsloggedIn(true);
            } else {
                throw new Error("Invalid token format");
            }
        } catch (err) {
            console.error("Token decode error during login:", err);
            resetSessionData();
        }
    }

    function logout() {
        resetSessionData();
    }

    return (
        <AuthContext.Provider
            value={{
                username,
                uid,
                isLoggedIn,
                isLoadingState,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
