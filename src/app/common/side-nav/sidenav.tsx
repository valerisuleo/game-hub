import useGenres from '../../views/games/hooks/useGenres';
import ListGroupComponent from '../../library/components/list-group/list-group';
import { IListGroup } from '../../library/components/list-group/interfaces';
import { useTheme } from '../context/theme';
import { useDataContext } from '../context/data';

const SideNavComponent = () => {
    const { isDarkMode } = useTheme();
    const { genres } = useGenres();
    const { outputEvent } = useDataContext();

    const props: IListGroup = {
        collection: genres,
        itemKey: 'id',
        text: 'name',
        isFlush: true,
        isDarkMode,
        onEmitEvent: handleClick,
    };

    function handleClick(current) {
        outputEvent({
            name: 'genres',
            data: current,
        });
    }

    return (
        <div className="mt-5">
            <ListGroupComponent {...props} />
        </div>
    );
};

export default SideNavComponent;
