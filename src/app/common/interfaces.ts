/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export interface IDarkMode {
    isDarkMode: boolean;
    className?: string;
}

export interface IClasses {
    custom?: string;
    size?: 'lg' | 'sm' | 'md';
    contextual:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger'
        | 'close'
        | 'light'
        | 'dark';
}

export interface Props {
    children: ReactNode;
}

export interface IReactQuery {
    key: string;
    queryGet?: any;
    mutationCreate?: any;
}
