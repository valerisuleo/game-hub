/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { formMaker } from './hooks/utils';
import useReactiveForm from './hooks/useReactiveForm';

const FormGroup = () => {
    const formControllers = [
        {
            type: 'text',
            name: 'username',
            label: 'Username',
            options: [],
            id: '6435bff3d16ecfa79bdcf3d9',
        },
        {
            type: 'select',
            name: 'age',
            label: 'Age',
            options: [
                { value: '', label: 'Choose category' },
                { value: '16', label: '16 years' },
                { value: '21', label: '21 years' },
                { value: '40', label: '40 years' },
            ],
            id: '6435bff3d16ecfa79bdcf3ddasc',
        },
        {
            type: 'radio',
            name: 'radios',
            label: 'Radio',
            options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                // Add more options as needed
            ],
        },
        {
            type: 'checkbox',
            name: 'liked',
            label: 'Liked',
            validators: [],
            options: [],
            id: '6435bff3d16ecfa79bdcf3dz',
        },
    ];

    const [controllers, setControllers] = useState([]);
    const [form, setForm] = useState(formMaker(formControllers));
    const { formGroup, handleChange, handleSubmit, handleBlur, renderInput } = useReactiveForm(
        form,
        formControllers,
        doSubmit,
        {
            resetOnSchemaChange: true,
        }
    );

    useEffect(() => {
        setControllers(formControllers);
    }, []);

    function doSubmit() {
        console.log('POST REQ');
        // console.log("errorMessages", errorMessages);
    }

    return (
        <Fragment>
            <div className="ms-3 mb-5">
                <h1>Form controls</h1>
                <p>
                    Examples and usage guidelines for form control styles, layout options, and
                    custom components.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {controllers.map((ctrl) => (
                    <Fragment key={ctrl.id}>
                        {ctrl.type === 'text' || ctrl.type === 'password' ? (
                            <div>{renderInput(ctrl, handleChange, handleBlur, formGroup)}</div>
                        ) : null}
                    </Fragment>
                ))}
            </form>

            {JSON.stringify(formGroup)}
        </Fragment>
    );
};

export default FormGroup;
