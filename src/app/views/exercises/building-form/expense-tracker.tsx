import { z } from 'zod';
import React, { Fragment, useState } from 'react';
import useReactiveForm from 'src/app/library/forms/hooks/useReactiveForm';
import { formMaker } from 'src/app/library/forms/hooks/utils';
import useTable from 'src/app/library/tables/hooks/useTable';
import TableComponent from 'src/app/library/tables/table';
import AlertsComponent from 'src/app/library/alerts/alerts';
import { Controller } from 'src/app/library/forms/hooks/interfaces';
import { IButtonAction, IExpense } from './interfaces';
import { Column } from 'src/app/library/tables/interfaces';

const ExpenseTracker = () => {
    const formControllers: Controller[] = [
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
    const tableHeader: Column[] = [
        ...formControllers.map((item) => ({ name: item.name })),
        { name: 'actions' },
    ];
    const actions: IButtonAction[] = [
        {
            classes: 'warning',
            label: 'Edit',
            name: 'edit',
        },
        {
            classes: 'danger',
            label: 'Delete',
            name: 'delete',
        },
    ];

    const [expenses, setExpenses] = useState<IExpense[]>([]);
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

    const { tableBody, updateTable, handleSort } = useTable(expenses, tableHeader, {
        sortable: true,
        defaultSortOrder: 'asc',
        mode: 'default',
    });

    function doSubmit(): void {
        console.log('POST REQ', formGroup);
        createExpense();
        resetForm();
    }

    function createExpense(): void {
        setExpenses((currentExpenses) => {
            const newExpense: IExpense = {
                ...formGroup,
                actions: (currentRow) => renderActions(currentRow),
            };

            const updatedExpenses = [...currentExpenses, newExpense];
            updateTable(updatedExpenses);

            return updatedExpenses;
        });
    }

    function deleteExpense(currentRow: IExpense): void {
        setExpenses((currentExpenses) => {
            const updatedExpenses = currentExpenses.filter(
                (item) => item.description !== currentRow.description
            );

            updateTable(updatedExpenses);
            return updatedExpenses;
        });
    }

    const handeleActions = (currentRow: IExpense, currentBtn: IButtonAction): void => {
        if (currentBtn.name === 'delete') {
            deleteExpense(currentRow);
        } else {
            console.log('edit');
        }
    };

    function renderActions(row: IExpense): React.ReactNode {
        return actions.map((btn: IButtonAction, i) => (
            <button
                key={i}
                className={`me-2 btn btn-sm btn-outline-${btn.classes}`}
                onClick={() => handeleActions(row, btn)}
            >
                {btn.label}
            </button>
        ));
    }

    return (
        <Fragment>
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
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6 mx-auto">
                    {expenses.length ? (
                        <TableComponent
                            tableHeader={tableHeader}
                            tableBody={tableBody()}
                            onSort={handleSort}
                        />
                    ) : (
                        <AlertsComponent classes="warning">
                            Oops! Fill the form to add an expense to the list...
                        </AlertsComponent>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ExpenseTracker;
