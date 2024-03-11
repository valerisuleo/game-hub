import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    handleDarkMode: () => void;
}

interface Props {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ThemeProvider = ({ children }: Props) => {
    const [isDarkMode, setDarkMode] = useState<boolean>(true);

    const handleDarkMode = () => {
        setDarkMode((prevState) => !prevState);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, handleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
