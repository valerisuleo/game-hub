import { ITodo, Action } from "./interfaces";

export function todoReducer(state: ITodo[], action: Action): ITodo[] {
    if (action.type === 'ADD') {
        return [...state, action.item];
    }
    if (action.type === 'REMOVE') {
        const result = state.filter((item) => item.id !== action.id);
        return result;
    }

    return state;
}
