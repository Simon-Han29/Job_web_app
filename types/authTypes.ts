import { ReactNode } from "react";
export interface AuthContextType {
    username: string;
    uid: string;
    isLoggedIn: boolean;
    isLoadingState: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface TokenType {
    username: string;
    uid: string;
    created_at: string;
}

export interface UserDataType {
    msg: string;
    token: string;
}
