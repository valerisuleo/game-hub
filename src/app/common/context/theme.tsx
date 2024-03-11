import { createContext, useContext, useState } from 'react';
import { Props } from '../interfaces';

interface ThemeContextType {
    isDarkMode: boolean;
    handleDarkMode: () => void;
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
