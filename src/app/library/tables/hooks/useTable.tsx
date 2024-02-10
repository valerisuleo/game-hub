/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import _ from 'lodash';

interface Column {
    colName: any;
}

interface Config {
    sortable: boolean;
    defaultSortOrder?: 'asc' | 'desc';
}

function useTable<T>(data: T[], columns: Column[], config: Config) {
    console.log(config);

    const [dataSource, setDataSource] = useState<T[]>(data);
    const [order, setOrder] = useState(config.defaultSortOrder);

    const handleSort = (current) => {
        if (config.sortable) {
            const { colName } = current;
            const clone = [...dataSource];
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder);

            const sortedsList = _.orderBy(
                clone,
                [(item) => item[colName].toLowerCase()],
                [newOrder]
            );

            setDataSource(sortedsList);
        }
    };

    const updateTable = (newData: any[]) => {
        setDataSource(newData);
    };

    function renderRows() {
        const preparedRows = dataSource.map((row) => {
            return columns.map((column) => {
                return row[column.colName];
            });
        });

        return preparedRows.map((row, rowIndex) => {
            return (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                    ))}
                </tr>
            );
        });
    }

    return { columns, renderRows, updateTable, handleSort };
}

export default useTable;
