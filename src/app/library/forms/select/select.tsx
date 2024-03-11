import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import styles from '../errors/errors-component.module.scss';
import _ from 'lodash';

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
    error,
}: IFormCtrl) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {_.startCase(label)}
            </label>

            <select
                className={`form-select ${error ? styles.error : ''}`}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ''}
                name={name}
                data-type={type}
            >
                {options?.map((item) => (
                    <option key={item[valueProp]} value={item[valueProp]}>
                        {_.startCase(item[textProp])}
                    </option>
                ))}
            </select>
            {error && <ErrorsComponent error={error} />}
        </div>
    );
};

export default SelectComponent;
