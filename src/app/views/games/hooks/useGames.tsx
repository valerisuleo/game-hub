import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame } from '../interfaces';
import { iconMap } from '../../../common/utilities';

const useGames = () => {
    const [games, setGames] = useState([]);


    useEffect(() => {
        getGames();
    }, []);

    async function getGames(): Promise<void> {
        const promise = gameService.get('/games');
        const { data } = await promise;

        const result = data.results.map((element: IGame) => {
            return {
                ...element,
                parent_platforms: element.parent_platforms.map((item) => ({
                    ...item['platform'],
                    icon: iconMap[item['platform'].slug] || '',
                })),
            };
        });

        setGames(result);
    }

    return { games };
};

export default useGames;
