import { createContext, useContext, useState, useEffect} from "react";
import type { ReactNode } from "react";
import {registerErrorHandler } from "../ErrorHandle/ErrorHandler";


type SnackbarType = "success" | "error" | "warning" | "info";

type UIContextType = {
    message:string | null;
    type:SnackbarType;
    showMessage:(message:string,type?:SnackbarType) => void;
    clear:() => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider ({ children }:{ children:ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<SnackbarType>("info");

    const showMessage = (msg: string, t: SnackbarType = "info") => {
        setMessage(msg);
        setType(t);
    };

    const clear = () => {
        setMessage(null);
    }
    useEffect(() => {
        registerErrorHandler((msg, severity = "error") => {
            showMessage(msg, severity as SnackbarType);
        });
    }, []);
    return (
        <UIContext.Provider value={{message, type, showMessage, clear}}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI(){
    const context = useContext(UIContext);

    if (!context) {
        throw new Error("UseUI must be used inside UIProvider. ESEN kal.")
    }

    return context;
}