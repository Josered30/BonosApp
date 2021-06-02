import React from "react";
import { createContext, useReducer } from "react";

type Action = { type: 'loading' } | { type: 'done' };
type Dispatch = (action: Action) => void;
type State = { state: boolean };
type SpinnerProviderProps = { children: React.ReactNode };


const SpinnerContext = createContext<{ spinnerState: State, spinnerDispatcher: Dispatch } | undefined>(undefined);

function spinnerReducer(state: State, action: Action) {
    switch (action.type) {
        case 'loading': {
            return { state: true };
        }
        case 'done': {
            return { state: false };
        }
    }
}


function SpinnerProvider({ children }: SpinnerProviderProps) {
    const [state, dispatch] = useReducer(spinnerReducer, { state: false });
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {
        spinnerState: state,
        spinnerDispatcher: dispatch
    };

    return <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>;
}


function useSpinner() {
    const context = React.useContext(SpinnerContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a SpinnerProvider');
    }
    return context;
}

export { SpinnerProvider, useSpinner };