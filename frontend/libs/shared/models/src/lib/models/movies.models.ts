import { ICategory } from "./category.models";

export interface IMovies {
    id: number;
    name: string;
    slug: string;
    originName: string;
    status: string;
    type: string;
    category: ICategory[];
    posterUrl: string;
    thumbUrl: string;
    episodeTotal: number;
    episodeCurrent: number;
    quality: string;
    createdTime: string;
}
