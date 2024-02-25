import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { counterReducer } from '../counter-component/reducer';

interface Props {
    children: ReactNode;
}

// Creating the context
const CounterContext = createContext(null);

export const useCounter = () => useContext(CounterContext);
// Creating the provider component
export const CounterProvider = ({ children }: Props) => {
    // const [count, setCount] = useState(0);
    // const increase = () => setCount((count) => count + 1);
    // const decrease = () => setCount((count) => count - 1);
    const [value, dispatch] = useReducer(counterReducer, 0);

    return (
        <CounterContext.Provider value={{ value, dispatch }}>{children}</CounterContext.Provider>
    );
};
