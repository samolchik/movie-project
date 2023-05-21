export interface IVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    published_at: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
}

export interface IVideos {
    id: number;
    results: IVideo[];
}