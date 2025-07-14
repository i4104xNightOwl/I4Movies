import { ICategories } from "./categories.models";

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
    episodeTotal: number;
    episodeCurrent: number;
    quality: string;
    createdTime: string;
}
