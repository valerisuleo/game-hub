import { z } from 'zod';
import { Fragment, useState } from 'react';
import useReactiveForm from 'src/app/library/forms/hooks/useReactiveForm';
import { formMaker } from 'src/app/library/forms/hooks/utils';
import useTable from 'src/app/library/tables/hooks/useTable';
import TableComponent from 'src/app/library/tables/table';

const ExpenseTracker = () => {
    const formControllers = [
        {
            type: 'text',
            name: 'description',
            label: 'description',
            validators: [z.string().min(3)],
            options: [],
            id: '6435bff3d16ecfa79bdcf310',
        },
        {
            type: 'text',
            name: 'amount',
            label: 'amount',
            validators: [z.string().min(1)],
            options: [],
            id: '6435bff3d16ecfa79bdcf3d9',
        },

        {
            type: 'select',
            name: 'category',
            label: 'category',
            options: [
                { value: '', label: 'Choose category' },
                { value: 'grocery', label: 'grocery' },
                { value: 'utilities', label: 'utilities' },
                { value: 'entertainment', label: 'entertainment' },
            ],
            validators: [z.string().min(1)],
            id: '6435bff3d16ecfa79bdcf3ddasc',
        },
    ];

    const [expenses, setExpenses] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [controllers, setControllers] = useState(formControllers);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [form, setForm] = useState(formMaker(formControllers));
    const {
        formGroup,
        errorMessages,
        resetForm,
        handleChange,
        handleSubmit,
        handleBlur,
        renderInput,
        renderSelect,
    } = useReactiveForm(form, formControllers, doSubmit, {
        resetOnSchemaChange: false,
    });

    // const tableHeader = formControllers.map((item) => {
    //     return {
    //         colName: item.name,
    //     };
    // });

    const tableHeader = [{ colName: 'style' }, { colName: 'flavor' }];

    const data = [
        { style: 'Old Fashioned', flavor: 'Chocolate' },
        { style: 'Cake', flavor: 'Coconut' },
        { style: 'Yeast', flavor: 'Frosted' },
        { style: 'Glazed', flavor: 'Plain' },
        { style: 'Cruller', flavor: 'Plain' },
        { style: 'Cream', flavor: 'Boston Creme' },
        { style: 'Jelly', flavor: 'Raspberry' },
        { style: 'French Cruller', flavor: 'Strawberry' },
        { style: 'Fritter', flavor: 'Apple' },
    ];
    const { renderRows, updateTable, handleSort } = useTable(data, tableHeader, {
        sortable: true,
        defaultSortOrder: "asc"
    });

    function doSubmit() {
        console.log('POST REQ', formGroup);
        createExpense();
        resetForm();
    }

    function createExpense() {
        const newData = [...expenses, formGroup];
        setExpenses(newData);
        updateTable(newData);
    }

    return (
        <div className="row mt-5">
            <div className="col-6 mx-auto">
                <form onSubmit={handleSubmit}>
                    {controllers.map((ctrl) => (
                        <Fragment key={ctrl.id}>
                            {ctrl.type === 'text' ? (
                                <div>
                                    {renderInput(
                                        ctrl,
                                        handleChange,
                                        handleBlur,
                                        formGroup,
                                        errorMessages
                                    )}
                                </div>
                            ) : null}
                            {ctrl.type === 'select' ? (
                                <div>
                                    {renderSelect(
                                        ctrl,
                                        handleChange,
                                        handleBlur,
                                        formGroup,
                                        'value',
                                        'label',
                                        errorMessages
                                    )}
                                </div>
                            ) : null}
                        </Fragment>
                    ))}
                    <button type="submit" className="btn btn-primary my-3">
                        Submit
                    </button>
                </form>
                <p className="my-5">{JSON.stringify(formGroup)}</p>
                <p className="my-5">{JSON.stringify(expenses)}</p>

                <TableComponent
                    tableHeader={tableHeader}
                    tableBody={renderRows()}
                    onSort={handleSort}
                />
            </div>
        </div>
    );
};

export default ExpenseTracker;
