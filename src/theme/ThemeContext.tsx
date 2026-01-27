import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const ThemeModeContext = createContext({
    toggleTheme: () => {}
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">(
        (localStorage.getItem("theme") as "light" | "dark") || "light"
    );

    const toggleTheme = () => {
        const next = mode === "light" ? "dark" : "light";
        setMode(next);
        localStorage.setItem("theme", next);
    };

    const theme = useMemo(
        () => createTheme({ palette: { mode } }),
        [mode]
    );

    return (
        <ThemeModeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};
