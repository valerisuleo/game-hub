import { createContext, useContext, useState } from 'react';
import { Props } from '../../interfaces';

// Creating the context
const SidaNavContext = createContext(null);

export const useSideNav = () => useContext(SidaNavContext);
// Creating the provider component
export const SideNavProvider = ({ children }: Props) => {
    const [itemActive, setActive] = useState({});

    const handleSelection = (current) => {
        setActive(current);
    };

    return (
        <SidaNavContext.Provider value={{ itemActive, handleSelection }}>
            {children}
        </SidaNavContext.Provider>
    );
};
