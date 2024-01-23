export interface IFormCtrl {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any[];
    textProp?: string;
    valueProp?: string;
    placeholder?: string;
}
