/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { IGenre } from '../interfaces';
import { gameService } from '../service';
import useCustomMutation from '../../../common/hooks/useCustomMutation';

const useGenres = () => {
    const [collection, setCollection] = useState<IGenre[]>([]);

    const { data, errors, isLoading } = useCustomMutation({
        key: 'genres',
        queryGet: fetchGnenres,
    });

    async function fetchGnenres() {
        const promise = gameService.get('/genres');
        const { data } = await promise;
        mapped(data);
        return data;
    }

    function mapped(response) {
        const results = response.results.map((item) => ({
            ...item,
            value: item.id,
        }));

        setCollection(results);
        
    }

    // useEffect(() => {
    //     getGenres();
    // }, []);

    // async function getGenres(): Promise<void> {
    //     const promise = gameService.get('/genres');
    //     const { data } = await promise;
    //     const results = data.results.map((item) => ({
    //         ...item,
    //         value: item.id,
    //     }));
    //     setCollection(results);
    // }

    return { genres: collection };
};

export default useGenres;
