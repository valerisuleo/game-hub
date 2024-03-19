/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame } from '../interfaces';
import { iconMap } from '../../../common/utilities';
import { IEventEmitted, useDataContext } from '../../../common/context/data';

const useGames = () => {
    const { event } = useDataContext();
    const [isLoading, setSpinner] = useState(false);
    const [collection, setCollection] = useState<IGame[]>([]);

    useEffect(() => {
        if (event && event.name) {
            const { name, data } = event;

            if (name === 'search') {
                gamesQuery(`${name}=${data.value}`);
            }

            if (event?.name === 'genres') {
                gamesQuery(`${name}=${data.id}`);
            }
        }
    }, [event]);

    useEffect(() => {
        gamesQuery();
    }, []);

    async function gamesQuery(query?): Promise<void> {
        try {
            setSpinner(true);

            const endPoint = query ? `/games?${query}` : '/games';
            const promise = gameService.get(endPoint);
            const { data } = await promise;

            setCollection(addIconProp(data.results));
        } catch (error) {
            console.log('global handler', error);
        } finally {
            setSpinner(false);
        }
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

    function updateGamesList(current: IEventEmitted): void {
        const { name, data } = current;
        const allPlatforms = '666';
        const isNotAllPlatforms =
            data !== allPlatforms && data?.platforms !== allPlatforms;

        if (!isNotAllPlatforms) {
            //reset
            gamesQuery();
            return;
        }

        switch (name) {
            case 'platformAndOrdering':
                gamesQuery(
                    `platforms=${data.platforms}&ordering=${data.ordering}`
                );
                break;
            case 'ordering':
                gamesQuery(`${name}=${data}`);
                break;
            case 'platforms':
                gamesQuery(`${name}=${data}`);
                break;
            default:
                console.log('unexpected', current);
        }
    }

    return { games: collection, updateGamesList, isLoading };
};

export default useGames;
