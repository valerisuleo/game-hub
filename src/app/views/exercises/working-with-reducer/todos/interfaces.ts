export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}


export interface Action {
    type: 'ADD' | 'REMOVE';
    item?: ITodo;
    id?: number;
}