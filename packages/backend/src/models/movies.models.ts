import { ICategories, IMovies } from "@movies/interfaces";

export class Movies implements IMovies {
    id: string | number;
    name: string;
    slug: string;
    originName: string;
    status: string;
    type: string;
    category: ICategories[];
    posterUrl: string;
    thumbUrl: string;
    episodeCurrent: number;
    episodeTotal: number;
    quality: string;
    createdTime: string;
}

export class MoviesBuilder {
    private movies: IMovies;
    private constructor() { this.movies = new Movies(); }

    setName(name: string): MoviesBuilder {
        this.movies.name = name;
        return this;
    }

    setSlug(slug: string): MoviesBuilder {
        this.movies.slug = slug;
        return this;
    }

    setOriginName(originName: string): MoviesBuilder {
        this.movies.originName = originName;
        return this;
    }

    setStatus(status: string): MoviesBuilder {
        this.movies.status = status;
        return this;
    }

    setType(type: string): MoviesBuilder {
        this.movies.type = type;
        return this;
    }

    setCategory(category: ICategories[]): MoviesBuilder {
        this.movies.category = category;
        return this;
    }

    setPosterUrl(posterUrl: string): MoviesBuilder {
        this.movies.posterUrl = posterUrl;
        return this;
    }

    setThumbUrl(thumbUrl: string): MoviesBuilder {
        this.movies.thumbUrl = thumbUrl;
        return this;
    }

    setEpisodeCurrent(episodeCurrent: number): MoviesBuilder {
        this.movies.episodeCurrent = episodeCurrent;
        return this;
    }

    setEpisodeTotal(episodeTotal: number): MoviesBuilder {
        this.movies.episodeTotal = episodeTotal;
        return this;
    }

    setQuality(quality: string): MoviesBuilder {
        this.movies.quality = quality;
        return this;
    }

    setCreatedTime(createdTime: string): MoviesBuilder {
        this.movies.createdTime = createdTime;
        return this;
    }

    static create(): MoviesBuilder { return new MoviesBuilder(); }
    build(): IMovies { return this.movies; }
}
