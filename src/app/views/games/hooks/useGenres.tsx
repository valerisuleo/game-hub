import { useEffect, useState } from 'react';
import { IGenre } from '../interfaces';
import { gameService } from '../service';

const useGenres = () => {
    const [collection, setCollection] = useState<IGenre[]>([]);

    useEffect(() => {
        getGenres();
    }, []);

    async function getGenres(): Promise<void> {
        const promise = gameService.get('/genres');
        const { data } = await promise;
        const results = data.results.map((item) => ({
            ...item,
            value: item.id,
        }));
        setCollection(results);
    }

    return { genres: collection };
};

export default useGenres;
