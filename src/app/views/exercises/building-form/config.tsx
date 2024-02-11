import { Controller } from 'src/app/library/forms/hooks/interfaces';
import { Column } from 'src/app/library/tables/interfaces';
import { z } from 'zod';
import { IButtonAction } from './interfaces';

export const formControllers: Controller[] = [
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

export const tableHeader: Column[] = [
    ...formControllers.map((item) => ({ name: item.name })),
    { name: 'actions' },
];
export const actions: IButtonAction[] = [
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
