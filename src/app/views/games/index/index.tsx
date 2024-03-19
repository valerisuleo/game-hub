/* eslint-disable react-hooks/exhaustive-deps */
import CardComponent from '../../../library/components/cards/card';
import { useTheme } from '../../../common/context/theme';
import useGames from '../hooks/useGames';
import { cardProps, sortOptions } from './config';
import SelectComponent from '../../../library/forms/select/select';
import usePlatforms from '../hooks/usePlatforms';
import { Fragment, useEffect, useState } from 'react';
import SpinnerComponent from '../../../library/components/spinner/spinner';
import { IFormCtrl } from '../../../library/forms/hooks/interfaces';
import { IEventEmitted } from '../../../common/context/data';

function GameIndex() {
    const { isDarkMode } = useTheme();
    const { platforms } = usePlatforms();
    const { games, updateGamesList, isLoading } = useGames();
    const [filters, setFilters] = useState({
        platforms: '',
        ordering: '',
    });

    const data: IFormCtrl[] = [
        {
            name: 'platforms',
            label: 'filter by platforms',
            value: filters.platforms,
            onBlur: () => {},
            onChange: handleInputChange,
            type: 'select',
            textProp: 'name',
            valueProp: 'id',
            options: platforms,
        },
        {
            name: 'ordering',
            label: 'order by:',
            value: filters.ordering,
            onBlur: () => {},
            onChange: handleInputChange,
            type: 'select',
            textProp: 'label',
            valueProp: 'value',
            options: sortOptions,
        },
    ];

    useEffect(() => {
        if (filters.platforms && filters.ordering) {
            updateGamesList({
                name: 'platformAndOrdering',
                data: filters,
            });
        }
    }, [filters]);

    function handleInputChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const allPlatforms = '666';
        const { value, name } = e.target;
        const { platforms, ordering } = filters;
        const item: IEventEmitted = { name, data: value };
        // Update filters before fetching data
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // Fetch data based on the new filter
        if ((!platforms && !ordering) || value === allPlatforms) {
            updateGamesList(item);
        }
        // Check if the value is allPlatforms after fetching data
        if (value === allPlatforms) {
            // Reset filters to their default state
            setFilters({
                platforms: '',
                ordering: '',
            });
        }
    }

    return (
        <div className={`row ${isDarkMode && 'bg-dark'}`}>
            <div className="d-flex justify-content-even">
                {data.map((item, i) => (
                    <div className="me-3 my-4" key={i}>
                        <SelectComponent
                            options={item.options}
                            textProp={item.textProp}
                            valueProp={item.valueProp}
                            onChange={item.onChange}
                            onBlur={item.onBlur}
                            label={item.label}
                            name={item.name}
                            value={item.value}
                            type={item.type}
                            isDark={isDarkMode}
                        />
                    </div>
                ))}
            </div>

            {/* {JSON.stringify(filters)} */}

            <div className="row">
                {isLoading ? (
                    <SpinnerComponent color={'primary'} />
                ) : (
                    <Fragment>
                        {games.map((item) => {
                            const props = cardProps(item, isDarkMode);
                            return (
                                <div
                                    className="col-md-6 col-lg-4 mb-4"
                                    key={item.id}
                                >
                                    <CardComponent
                                        header={props.header}
                                        body={props.body}
                                        classes={props.classes}
                                        isDarkMode={props.isDarkMode}
                                    />
                                </div>
                            );
                        })}
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default GameIndex;
