import { ICategories } from "./categories.models";

export interface IEpisodes {
    name: string;
    m3u8: string;
}

export interface IMovies {
    id: string | number;
    name: string;
    slug: string;
    originName: string;
    status: string;
    type: string;
    category: ICategories[];
    posterUrl: string;
    thumbUrl: string;
    episodes: IEpisodes[];
    episodeTotal: string;
    episodeCurrent: string;
    quality: string;
    createdTime: string;
}
