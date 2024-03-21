/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame } from '../interfaces';
import { iconMap } from '../../../common/utilities';
import { IEventEmitted, useDataContext } from '../../../common/context/data';

const useGames = () => {
    const { event, outputEvent } = useDataContext();
    const [isLoading, setSpinner] = useState(false);
    const [collection, setCollection] = useState<IGame[]>([]);
    const state = {
        platforms: { isActive: false, value: '' },
        genres: { isActive: false, value: '' },
        ordering: { isActive: false, value: '' },
        search: { isActive: false, value: '' },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [queries, setQuery] = useState(state);

    useEffect(() => {
        if (event?.name) {
            const { name } = event;

            if (name === 'search') {
                getAll(event);
            }

            if (name === 'genres') {
                console.log(event);

                getAll(event);
            }
        }
    }, [event]);

    useEffect(() => {
        getAll();
    }, []);

    function getAll(item?: IEventEmitted): void {
        try {
            setSpinner(true);

            if (item && item.name) {
                setQuery((prevQueries) => {
                    const updatedQueries = {
                        ...prevQueries,
                        [item.name]: {
                            ...prevQueries[item.name],
                            isActive: true,
                            value: item.data.value,
                        },
                    };

                    fetchGames(`/games?${createQueryURL(updatedQueries)}`);

                    return updatedQueries;
                });
            } else {
                setQuery(state);

                fetchGames('/games');
            }
        } catch (error) {
            console.log('global handler', error);
        } finally {
            setSpinner(false);
        }
    }

    function updateGamesList(current: IEventEmitted): void {
        console.log(current);

        const { data } = current;
        const allPlatforms = '666';
        const isNotAllPlatforms = data.value !== allPlatforms;

        if (!isNotAllPlatforms) {
            //reset
            getAll();
            outputEvent({
                name: 'resetActiveClass',
                data: {
                    reset: true,
                },
            });
        } else {
            getAll(current);
        }
    }

    // _______________________________________UTILS_______________________________________
    function fetchGames(endPoint: string): void {
        gameService
            .get(endPoint)
            .then((response) =>
                setCollection(addIconProp(response.data.results))
            );
    }

    function addIconProp(list: IGame[]): IGame[] {
        return list.map((element: IGame) => {
            return {
                ...element,
                parent_platforms: element.parent_platforms.map((item) => ({
                    ...item['platform'],
                    icon: iconMap[item['platform'].slug] || '',
                })),
            };
        });
    }

    function createQueryURL(object): string {
        let url = '';
        let firstPair = true; // To control the addition of '&' in the string
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                const query = object[key];

                if (query.isActive) {
                    if (firstPair) {
                        // For the first key-value pair, don't prepend '&' to the URL
                        firstPair = false;
                    } else {
                        // For subsequent pairs, prepend '&' to separate the query parameters
                        url += '&';
                    }
                    // Append the key-value pair to the URL
                    url += `${key}=${query.value}`;
                }
            }
        }
        return url;
    }

    return { games: collection, updateGamesList, isLoading };
};

export default useGames;
