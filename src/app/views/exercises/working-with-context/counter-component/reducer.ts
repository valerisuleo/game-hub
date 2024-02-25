interface Action {
    type: 'ADD' | 'REMOVE';
}

export function counterReducer(state: number, action: Action): number {
    if (action.type === 'ADD') {
        return state + 1;
    }
    if (action.type === 'REMOVE' && state > 0) {
        return state - 1;
    }

    return state;
}
