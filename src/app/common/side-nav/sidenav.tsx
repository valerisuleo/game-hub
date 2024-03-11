import React from 'react';
import useGenres from '../../views/games/hooks/useGenres';
import ListGroupComponent from '../../library/components/list-group/list-group';
import { IListGroup } from '../../library/components/list-group/interfaces';
import { useTheme } from '../context/theme';
import { useSideNav } from './context/useSideNav';

const SideNavComponent = () => {
    const { isDarkMode } = useTheme();
    const { genres } = useGenres();
    const { handleSelection } = useSideNav();

    // console.log('genres', genres);

    const props: IListGroup = {
        collection: genres,
        key: 'id',
        text: 'name',
        isFlush: true,
        isDarkMode,
        onEmitEvent: handleClick,
    };

    function handleClick(current) {
        handleSelection(current);
    }

    return (
        <div className="mt-4">
            <ListGroupComponent {...props} />
        </div>
    );
};

export default SideNavComponent;
