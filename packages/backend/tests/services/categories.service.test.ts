import { ICategories } from "@movies/interfaces";
import { CategoriesService } from "@src/services/mongodb/categories.services";
import { Database } from "utils/database";

let defaultCategories: ICategories = {
    name: 'Action',
    slug: 'action'
}

beforeAll(async () => {
    await Database.getInstance();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('MoviesService', () => {
    const categoriesService = new CategoriesService();

    it('Tạo mới một categories', async () => {
        const categories = await categoriesService.create(defaultCategories);
        expect(categories.name).toBe(defaultCategories.name);
        expect(categories.slug).toBe(defaultCategories.slug);
    });
});
