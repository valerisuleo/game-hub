import { IFormInputField } from './interfaces';

const InputGroup = ({
    label,
    value,
    onChange,
    onBlur,
    name,
    type,
    placeholder,
}: IFormInputField) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                id={name} // for testing purposes
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputGroup;
