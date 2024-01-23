import { IFormCtrl } from "../hooks/interfaces";

const SelectComponent = ({
    options,
    textProp,
    valueProp,
    onChange,
    onBlur,
    label,
    name,
    type,
    value,
}: IFormCtrl) => {
    return (
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
                {label}
            </label>

            <select
                className="form-select"
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ''}
                name={name}
                data-type={type}
            >
                {options?.map((item) => (
                    <option key={item[valueProp]} value={item[valueProp]}>
                        {item[textProp]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
