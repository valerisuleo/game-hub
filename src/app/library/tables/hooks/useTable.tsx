/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import _ from 'lodash';
import { Column, Config } from '../interfaces';

function useTable<T>(data: T[], columns: Column[], config: Config) {
    const [dataSource, setDataSource] = useState<T[]>(data);
    const [order, setOrder] = useState(config.defaultSortOrder);

    function renderRow() {
        const preparedRows = dataSource.map((row) => {
            console.log(row, dataSource);

            return columns.map((column) => {
                return row[column.name];
            });
        });

        if (config.mode === 'default') {
            console.log(preparedRows);

            return preparedRows.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={`${rowIndex}-${cellIndex}`}>
                                {typeof cell === 'function'
                                    ? cell(dataSource[rowIndex])
                                    : _.startCase(cell)}
                            </td>
                        ))}
                    </tr>
                );
            });
        } else {
            return preparedRows;
        }
    }

    const handleSort = (current) => {
        if (config.sortable) {
            const { name } = current;
            const clone = [...dataSource];
            const newOrder = order === 'asc' ? 'desc' : 'asc';
            setOrder(newOrder);

            const sortedList = _.orderBy(clone, [(item) => item[name].toLowerCase()], [newOrder]);

            setDataSource(sortedList);
        }
    };

    const updateTable = (newData: any[]) => {
        setDataSource(newData);
    };

    return { columns, tableBody: renderRow, updateTable, handleSort };
}

export default useTable;
