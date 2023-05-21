import {IGenre} from "./genre.interface";

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: IGenre[];
    homepage: string;
    id: number;
    imdb_id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: Date;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}