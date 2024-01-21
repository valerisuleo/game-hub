import { useState } from 'react';
import { IListGroup } from './interfaces';

const ListGroupComponent = ({ collection, key, text, onEmitEvent }: IListGroup) => {
    const [isActive, setActive] = useState(-1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setClasses = (index: number, item?: any) => {
        let classes = 'list-group-item list-group-item-action ';

        if (isActive === index) {
            classes += 'active';
        }

        if (item?.isDisabled) {
            classes += 'disabled';
        }

        return classes;
    };

    return (
        <ul className="list-group">
            {collection?.map((item, i) => (
                <li
                    key={item[key]}
                    onClick={() => {
                        setActive(i);
                        onEmitEvent(item);
                    }}
                    className={setClasses(i, item)}
                    style={{ cursor: 'pointer' }}
                >
                    {item[text]}
                </li>
            ))}
        </ul>
    );
};

export default ListGroupComponent;
