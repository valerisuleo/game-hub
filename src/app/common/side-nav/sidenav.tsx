import useGenres from '../../views/games/hooks/useGenres';
import ListGroupComponent from '../../library/components/list-group/list-group';
import { IListGroup } from '../../library/components/list-group/interfaces';
import { useTheme } from '../context/theme';
import { useDataContext } from '../context/data';

const SideNavComponent = () => {
    const { isDarkMode } = useTheme();
    const { genres } = useGenres();
    const { outputEvent, event } = useDataContext();

    const props: IListGroup = {
        collection: genres,
        itemKey: 'id',
        text: 'name',
        isFlush: true,
        isDarkMode,
        onEmitEvent: handleClick,
        reset: event?.data.reset,
    };

    function handleClick(current) {
        outputEvent({
            name: 'genres',
            data: current,
        });
    }

    return (
        <div className={`${isDarkMode && 'text-white'} mt-2`}>
            <h4 className='ms-2'>Genres</h4>
            <ListGroupComponent {...props} />
        </div>
    );
};

export default SideNavComponent;
