/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import InputGroup from '../input-group/input-group';
import SelectComponent from '../select/select';

interface ReactiveFormConfig {
    resetOnSchemaChange?: boolean; // The '?' makes it an optional property
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useReactiveForm(
    schema: any,
    controllers: any[],
    doSubmit: any,
    config: ReactiveFormConfig = {} // Use the interface here
) {
    const [formGroup, setStateFormGroup] = useState(schema);

    useEffect(() => {
        if (config.resetOnSchemaChange) {
            setStateFormGroup(schema);
        }
    }, [schema, config.resetOnSchemaChange]);

    const handleChange = (e) => {
        const clone = { ...formGroup };
        const current = e.target;

        if (current.type === 'checkbox') {
            clone[current.name] = current.checked;
        } else {
            clone[current.name] = current.value;
        }

        setStateFormGroup(clone);
    };

    const handleBlur = (e) => {
        const current = e.target;
        const value = formGroup[current.name];
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        doSubmit();
    };

    function renderInput(controller, handleChange, handleBlur, formGroup) {
        const { label, name, type, placeholder } = controller;
        return (
            <InputGroup
                label={label}
                name={name}
                value={formGroup[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                placeholder={placeholder}
            />
        );
    }

    function renderSelect(controller, handleChange, handleBlur, formGroup, valueProp, textProp) {
        const { label, name, options, type } = controller;
        return (
            <SelectComponent
                label={label}
                name={name}
                value={formGroup[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                options={options}
                textProp={textProp}
                valueProp={valueProp}
            />
        );
    }

    return { formGroup, handleChange, handleSubmit, handleBlur, renderInput, renderSelect };
}

export default useReactiveForm;
