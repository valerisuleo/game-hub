/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from 'react';
import { Props } from '../interfaces';

export interface IEventEmitted {
    name: string;
    data: any; // Consider specifying a more precise type if possible
}

interface DataContextType {
    event: IEventEmitted | undefined; // Allow event to be undefined initially
    outputEvent: (current: IEventEmitted) => void;
}

// Define a default context value matching DataContextType
const defaultContextValue: DataContextType = {
    event: undefined,
    outputEvent: () => {}, // Provide a noop function as a placeholder
};

// Creating the context with an initial value that matches the expected type
const DataContext = createContext<DataContextType>(defaultContextValue);


export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({ children }: Props) => {
    const [event, setEvent] = useState<IEventEmitted | undefined>(undefined); // Explicitly allow undefined

    const outputEvent = (current: IEventEmitted) => {
        setEvent(current);
    };

    return (
        <DataContext.Provider value={{ event, outputEvent }}>
            {children}
        </DataContext.Provider>
    );
};
