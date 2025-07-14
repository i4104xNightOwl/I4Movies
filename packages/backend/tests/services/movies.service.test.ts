import { ICategories, IMovies } from '@movies/interfaces';
import Database from '../../utils/database';
import MoviesService from '@src/services/mongodb/movies.services';

let defaultCategories: ICategories = {
    name: 'Action',
    slug: 'action'
}

let defaultMovies: IMovies = {
    name: 'Action',
    slug: 'action',
    originName: 'Action',
    status: 'Action',
    type: 'Action',
    category: [
        defaultCategories
    ],
    posterUrl: 'Action',
    thumbUrl: 'Action',
    episodeCurrent: 1,
    episodeTotal: 2,
    quality: '',
    createdTime: ''
}

beforeAll(async () => {
    await Database.getInstance();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('MoviesService', () => {
    const moviesService = new MoviesService();

    it('Tạo mới một movies', async () => {
        const movies = await moviesService.create(defaultMovies);
        expect(movies.name).toBe(defaultMovies.name);
        expect(movies.slug).toBe(defaultMovies.slug);
        expect(movies.originName).toBe(defaultMovies.originName);
        expect(movies.status).toBe(defaultMovies.status);
        expect(movies.type).toBe(defaultMovies.type);
        expect(movies.category).toBe(defaultMovies.category);
        expect(movies.posterUrl).toBe(defaultMovies.posterUrl);
        expect(movies.thumbUrl).toBe(defaultMovies.thumbUrl);
        expect(movies.episodeCurrent).toBe(defaultMovies.episodeCurrent);
        expect(movies.episodeTotal).toBe(defaultMovies.episodeTotal);
        expect(movies.quality).toBe(defaultMovies.quality);
        expect(movies.createdTime).toBe(defaultMovies.createdTime);
    });
});
