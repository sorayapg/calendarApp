import { useState, useEffect } from 'react';

const THEME_KEY = 'theme';

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem(THEME_KEY) === 'dark'
    );

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return { isDarkMode, toggleTheme };
};
