import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const themes = ['light', 'light-soft', 'dark-midnight', 'dark-oled'];

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        // Remove all previous theme classes/attributes if any (though we use data-theme)
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const currentIndex = themes.indexOf(prevTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            return themes[nextIndex];
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
