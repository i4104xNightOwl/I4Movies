import { ICategories, IMovies } from "@movies/interfaces";
import { CategoriesBuilder } from "@src/models/categories.models";
import { MoviesBuilder } from "@src/models/movies.models";
import { MoviesService } from "@src/services/mongodb/movies.services";
import { Database } from "@utils/database";
import { CategoriesService } from '@src/services/mongodb/categories.services';

let testCategory: ICategories;
let testMovie: IMovies;

beforeAll(async () => {
    await Database.getInstance();

    testCategory = CategoriesBuilder.create()
        .setName('Action')
        .setSlug('action')
        .build();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('MoviesService', () => {

    it('Tạo mới một movies', async () => {
        const moviesService = new MoviesService();
        const categoriesService = new CategoriesService();

        const savedCategory = await categoriesService.create(testCategory);

        testMovie = MoviesBuilder.create()
            .setName('Action')
            .setSlug('action')
            .setOriginName('Action')
            .setStatus('Action')
            .setType('Action')
            .setCategory([savedCategory])
            .setPosterUrl('Action')
            .setThumbUrl('Action')
            .setEpisodeCurrent("Tập 1")
            .setEpisodeTotal("24 tập")
            .setQuality('Action')
            .setCreatedTime('Action')
            .build();

        const created = await moviesService.create(testMovie);

        expect(created.name).toBe(testMovie.name);
        expect(created.slug).toBe(testMovie.slug);

        expect(created.category).toEqual(expect.arrayContaining([savedCategory]));
    });

    it("Lấy movie theo id", async () => {
        const moviesService = new MoviesService();
        const categoriesService = new CategoriesService();

        const savedCategory = await categoriesService.create(testCategory);

        testMovie = MoviesBuilder.create()
            .setName('Action')
            .setSlug('action')
            .setOriginName('Action')
            .setStatus('Action')
            .setType('Action')
            .setCategory([savedCategory])
            .setPosterUrl('Action')
            .setThumbUrl('Action')
            .setEpisodeCurrent("Tập 1")
            .setEpisodeTotal("24 tập")
            .setQuality('Action')
            .setCreatedTime('Action')
            .build();

        const created = await moviesService.create(testMovie);
        const fetched = await moviesService.get(created.id!);

        expect(fetched.id).toBe(created.id);
        expect(fetched.name).toBe(created.name);
    });

    it("Lấy danh sách movie", async () => {
        const moviesService = new MoviesService();
        const categoriesService = new CategoriesService();

        const savedCategory = await categoriesService.create(testCategory);

        testMovie = MoviesBuilder.create()
            .setName('Action')
            .setSlug('action')
            .setOriginName('Action')
            .setStatus('Action')
            .setType('Action')
            .setCategory([savedCategory])
            .setPosterUrl('Action')
            .setThumbUrl('Action')
            .setEpisodeCurrent("Tập 1")
            .setEpisodeTotal("24 tập")
            .setQuality('Action')
            .setCreatedTime('Action')
            .build();

        const created = await moviesService.create(testMovie);
        const all = await moviesService.getAll();

        expect(all).toEqual(expect.arrayContaining([expect.objectContaining({ name: created.name, slug: created.slug })]));
    });

    it("Cập nhật movie", async () => {
        const moviesService = new MoviesService();
        const categoriesService = new CategoriesService();

        const savedCategory = await categoriesService.create(testCategory);

        testMovie = MoviesBuilder.create()
            .setName('Action')
            .setSlug('action')
            .setOriginName('Action')
            .setStatus('Action')
            .setType('Action')
            .setCategory([savedCategory])
            .setPosterUrl('Action')
            .setThumbUrl('Action')
            .setEpisodeCurrent("Tập 1")
            .setEpisodeTotal("24 tập")
            .setQuality('Action')
            .setCreatedTime('Action')
            .build();

        const created = await moviesService.create(testMovie);

        const updated = created.episodeCurrent + 1;
        const result = await moviesService.update({ ...created, episodeCurrent: updated });

        expect(result.episodeCurrent).toBe(updated);
    });

    it("Xóa movie", async () => {
        const moviesService = new MoviesService();
        const categoriesService = new CategoriesService();

        const savedCategory = await categoriesService.create(testCategory);

        testMovie = MoviesBuilder.create()
            .setName('Action')
            .setSlug('action')
            .setOriginName('Action')
            .setStatus('Action')
            .setType('Action')
            .setCategory([savedCategory])
            .setPosterUrl('Action')
            .setThumbUrl('Action')
            .setEpisodeCurrent("Tập 1")
            .setEpisodeTotal("24 tập")
            .setQuality('Action')
            .setCreatedTime('Action')
            .build();

        const created = await moviesService.create(testMovie);
        const result = await moviesService.delete(created);

        expect(result).toBe(true);
    });
});
