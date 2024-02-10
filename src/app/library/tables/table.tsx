/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ITable {
    tableHeader: any;
    tableBody: any;
    onSort: any;
}

const TableComponent = ({ tableHeader, tableBody, onSort }: ITable) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {tableHeader.map((item, i) => (
                        <th key={i} onClick={() => onSort(item)}>
                            {item.colName.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    );
};

export default TableComponent;
