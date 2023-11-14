import React, { useContext, useEffect, useState } from "react";
import apiClient from "../lib/apiClient";

const AuthContext = React.createContext({
    login: () => { },
    logout: () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

            apiClient.get("/user/find").then((res) => {
                setUser(res.data.user);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);

    const login = async (token) => {
        localStorage.setItem("auth_token", token);
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        try {
            apiClient.get("/user/find").then((res) => {
                setUser(res.data.user);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        delete apiClient.defaults.headers["Authorization"];
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};