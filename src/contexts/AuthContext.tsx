import React from "react";
import { createContext, useReducer, useState } from "react"
import { Role } from "../models/enums/role";


type Action = { type: 'login' } | { type: 'logout' };
type Dispatch = (action: Action) => void;
type State = {
    state: boolean,
    role: Role
};
type AuthProviderProps = { children: React.ReactNode };


const AuthContext = createContext<{ authState: State, authDispatch: Dispatch } | undefined>(undefined);

function authReducer(state: State, action: Action) {
    switch (action.type) {
        case 'login': {
            return {
                state: true,
                role: Role.Bussinness
            };
        }
        case 'logout': {
            return {
                state: false,
                role: Role.Bussinness
            };
        }
    }
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, { state: false, role: Role.None });
    const value = { authState: state, authDispatch: dispatch };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}


export { AuthProvider, useAuth };