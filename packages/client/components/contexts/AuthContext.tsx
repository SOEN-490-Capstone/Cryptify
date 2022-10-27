import React from "react";
import { User } from "@cryptify/common/src/domain/entities/user";

type AuthContextValues = {
    setToken: (token: string) => void;
    token: string;
    setUser: (user: User) => void;
    user: User;
};

export const AuthContext = React.createContext<AuthContextValues>({} as any);
