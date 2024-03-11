export interface IGame {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: IPlatform[];
    genres: IGenre[];
}

export interface IGenre {
    id: number;
    name: string;
    background_image: string;
    games: IGame[];
}

export interface IGameQuery {
    games: IGame[];
    genres: IGenre[];
}

interface IPlatform {
    id: number;
    name: string;
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
}
