/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame, IGenre } from '../interfaces';
import { iconMap } from '../../../common/utilities';
import { useSideNav } from '../../../common/side-nav/context/useSideNav';
import { IEventEmitted } from '../../../common/interfaces';

const useGames = () => {
    const [isLoading, setSpinner] = useState(false);
    const [collection, setCollection] = useState<IGame[]>([]);
    const { itemActive } = useSideNav();
    const currentGenre: IGenre = itemActive;

    useEffect(() => {
        gamesQuery();
    }, []);

    useEffect(() => {
        if (currentGenre && currentGenre.id) {
            getGamesByGenre();
        }
    }, [currentGenre]);

    async function gamesQuery(query?): Promise<void> {
        try {
            setSpinner(true);
            const endPoint = query ? `/games?${query}` : '/games';

            console.log('endPoint', endPoint);

            const promise = gameService.get(endPoint);
            const { data } = await promise;
            setCollection(addIconProp(data.results));
        } catch (error) {
            console.log('global handler', error);
        } finally {
            setSpinner(false);
        }
    }

    function getGamesByGenre(): void {
        gamesQuery(`genres=${currentGenre.id}`);
    }

    function getGamesByPlatform(current: IEventEmitted): void {
        gamesQuery(`platforms=${current.value}`);
    }

    function getGamesBySortOrder(current: IEventEmitted): void {
        gamesQuery(`ordering=${current.value}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getGamesByPlatformAndSortOrder(current: {
        name: string;
        value: { platforms: string; sorting: '' };
    }): void {
        const { platforms, sorting } = current.value;
        const queryParams = `platforms=${platforms}&ordering=${sorting}`;
        gamesQuery(queryParams);
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

    function handleEvent(current: IEventEmitted): void {
        const allPlatforms = '666';
        const isNotAllPlatforms =
            current.value !== allPlatforms &&
            current.value?.platforms !== allPlatforms;

        if (!isNotAllPlatforms) {
            gamesQuery();
            return;
        }

        switch (current.name) {
            case 'platforms':
                getGamesByPlatform(current);
                break;
            case 'sorting':
                getGamesBySortOrder(current);
                break;
            case 'platformAndSorting':
                getGamesByPlatformAndSortOrder(current);
                break;
            default:
                console.log('current', current);
        }
    }

    return { games: collection, handleEvent, isLoading };
};

export default useGames;
