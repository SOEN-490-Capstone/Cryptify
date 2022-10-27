import React from "react";

type AuthContextValues = {
    setToken: (token: string) => void,
    token: string,
}

export const AuthContext = React.createContext<AuthContextValues>({
    setToken: (token: string) => {},
    token: "",
});
