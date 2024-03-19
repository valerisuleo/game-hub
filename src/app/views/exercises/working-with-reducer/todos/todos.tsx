import { Fragment, useReducer } from 'react';
import ListGroupComponent from 'src/app/library/components/list-group/list-group';
import { todoReducer } from './reducer';

const Todos = () => {
    // const [list, setList] = useState<ITodo[]>([
    //     {
    //         userId: 1,
    //         id: 1,
    //         title: 'delectus aut autem',
    //         completed: false,
    //     },
    // ]);

    const [value, dispatch] = useReducer(todoReducer, [
        {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
        },
    ]);

    const newTodo = {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    };

    // const handleSelection = (current: ITodo) => {
    //     console.log(current);
    //     const result = list.filter((item) => item.id !== current.id);

    //     setList(result);
    // };

    return (
        <Fragment>
            <h1>todos</h1>
            <button
                className="btn btn-primary my-5"
                onClick={() =>
                    dispatch({
                        type: 'ADD',
                        item: newTodo,
                    })
                }
            >
                Add todo
            </button>

            <p>{JSON.stringify(value)}</p>

            <ListGroupComponent
                collection={value}
                itemKey={'id'}
                text={'title'}
                onEmitEvent={(item) =>
                    dispatch({
                        type: 'REMOVE',
                        id: item.id,
                    })
                }
            ></ListGroupComponent>
        </Fragment>
    );
};

export default Todos;
