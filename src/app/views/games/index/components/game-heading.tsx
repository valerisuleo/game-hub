/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDataContext } from '../../../../common/context/data';
import { IGameHeader } from '../../interfaces';
import { useTheme } from '../../../../common/context/theme';

const Heading = ({ filters, platforms }: IGameHeader) => {
    const { event } = useDataContext();
    const { isDarkMode } = useTheme();
    const [title, setTitle] = useState({
        genres: '',
        platforms: '',
    });

    useEffect(() => {
        if (event?.name === 'genres') {
            const { name, data } = event;

            setTitle((prevState) => ({
                ...prevState,
                [name]: data.name,
            }));
        }

        if (event?.name === 'resetActiveClass') {
            setTitle({ genres: '', platforms: '' });
        }
    }, [event]);

    useEffect(() => {
        setTitle((prevState) => ({
            ...prevState,
            platforms: platforms.find(
                (item) => item.id.toString() === filters.platforms
            )?.name,
        }));
    }, [filters.platforms]);

    return (
        <h1 className={`${isDarkMode && 'text-white'} my-4`}>
            {title.genres || ''} {title.platforms || ''} Games
        </h1>
    );
};

export default Heading;
