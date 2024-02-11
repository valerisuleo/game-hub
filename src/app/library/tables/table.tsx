import _ from 'lodash';

interface TableColumn {
    name: string;
}

interface ITable {
    tableHeader: TableColumn[];
    tableBody: React.ReactNode; // Assuming tableBody is JSX or any React node
    onSort: (column: TableColumn) => void; // Specify the function signature for sorting
}

const TableComponent: React.FC<ITable> = ({ tableHeader, tableBody, onSort }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {tableHeader.map((item, index) => (
                        <th key={index} onClick={() => item.name !== 'actions' && onSort(item)}>
                            {item.name === 'actions' ? '' : _.startCase(item.name)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    );
};

export default TableComponent;
