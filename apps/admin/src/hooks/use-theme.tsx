import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextProps = {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<ThemeContextProps["theme"]>(
        (localStorage.getItem("theme") as ThemeContextProps["theme"]) || "light",
    );

    const changeTheme = (theme: ThemeContextProps["theme"]) => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    };

    useEffect(() => {
        changeTheme(theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}