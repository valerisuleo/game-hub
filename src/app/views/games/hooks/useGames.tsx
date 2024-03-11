/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame, IGenre } from '../interfaces';
import { iconMap } from '../../../common/utilities';
import { useSideNav } from '../../../common/side-nav/context/useSideNav';

const useGames = () => {
    const [collection, setCollection] = useState<IGame[]>([]);
    const { itemActive } = useSideNav();
    const current: IGenre = itemActive;

    useEffect(() => {
        getGames();
    }, []);

    useEffect(() => {
        if (current && current.id) {
            getGamesByGenre('genres', current.id);
        }
    }, [current]);

    async function getGames(): Promise<void> {
        const promise = gameService.get('/games');
        const { data } = await promise;
        setCollection(addIconProp(data.results));
    }

    async function getGamesByGenre(
        queryParams: string,
        id: number
    ): Promise<void> {
        const promise = gameService.get(`/games?${queryParams}=${id}`);
        const { data } = await promise;
        setCollection(addIconProp(data.results));
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

    return { games: collection };
};

export default useGames;
