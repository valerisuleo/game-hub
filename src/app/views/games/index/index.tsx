import CardComponent from '../../../library/components/cards/card';
import { useTheme } from '../../../common/context/theme';
import useGames from '../hooks/useGames';
import { cardProps } from './config';

function GameIndex() {
    const { games } = useGames();
    const { isDarkMode } = useTheme();

    console.log(games);

    return (
        <div className={`row ${isDarkMode && 'bg-dark'}`}>
            <h1>Welcome to GameIndex!</h1>

            <div className="row">
                {games.length &&
                    games.map((item) => {
                        const props = cardProps(item, isDarkMode);
                        return (
                            <div
                                className="col-md-6 col-lg-4 mb-4"
                                key={item.id}
                            >
                                <CardComponent
                                    header={props.header}
                                    body={props.body}
                                    classes={props.classes}
                                    isDarkMode={props.isDarkMode}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default GameIndex;
