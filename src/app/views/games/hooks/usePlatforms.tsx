import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IPlatform } from '../interfaces';

const usePlatforms = () => {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        getPlatforms();
    }, []);

    async function getPlatforms(): Promise<void> {
        const promise = gameService.get('/platforms');
        const { data } = await promise;
        const obj: IPlatform = {
            id: 666,
            name: 'All',
            slug: 'all',
        };
        setCollection([obj, ...data.results]);
    }

    return { platforms: collection };
};

export default usePlatforms;
