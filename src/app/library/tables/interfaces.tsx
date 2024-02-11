export interface Column {
    name: string;
}

export interface Config {
    sortable: boolean;
    defaultSortOrder?: 'asc' | 'desc';
    mode: 'default' | 'custom';
}
