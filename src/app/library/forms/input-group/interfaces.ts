/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFormInputField {
    label: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
    name: string;
    type: string;
    placeholder?: string;
}
