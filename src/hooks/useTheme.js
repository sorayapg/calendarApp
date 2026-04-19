import { useState, useEffect } from 'react';
import { applyTheme, getInitialTheme } from '../helpers/theme';

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => getInitialTheme() === 'dark'
    );

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        applyTheme(theme);
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return { isDarkMode, toggleTheme };
};
