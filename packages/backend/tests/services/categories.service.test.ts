import { ICategories } from "@movies/interfaces";
import { CategoriesBuilder } from "@src/models/categories.models";
import { CategoriesService } from "@src/services/mongodb/categories.services";
import { Database } from "@utils/database";

let defaultCategories: ICategories;;

beforeAll(async () => {
    defaultCategories = CategoriesBuilder.create()
        .setName('Action')
        .setSlug('action')
        .build();

    await Database.getInstance();
});

beforeEach(async () => {
    await Database.dropDatabase();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('CategoriesService', () => {
    const categoriesService = new CategoriesService();

    it('Tạo mới một categories', async () => {
        const category = await categoriesService.create(defaultCategories);

        expect(category.name).toBe(defaultCategories.name);
        expect(category.slug).toBe(defaultCategories.slug);
        expect(typeof category.id).toBe('string');
    });

    it('Lấy tất cả categories', async () => {
        const created = await categoriesService.create(defaultCategories);
        const all = await categoriesService.getAll();

        expect(all).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: created.name, slug: created.slug }),
            ])
        );
    });

    it('Lấy một category theo ID', async () => {
        const created = await categoriesService.create(defaultCategories);
        const fetched = await categoriesService.get(created.id!);

        expect(fetched.id).toBe(created.id);
        expect(fetched.name).toBe(created.name);
        expect(fetched.slug).toBe(created.slug);
    });

    it('Cập nhật category', async () => {
        const created = await categoriesService.create(defaultCategories);

        created.name = 'Adventure';
        const updated = await categoriesService.update(created);

        expect(updated.name).toBe('Adventure');
        expect(updated.slug).toBe('action');
    });

    it('Xoá category', async () => {
        const created = await categoriesService.create(defaultCategories);
        const deleted = await categoriesService.delete(created);

        expect(deleted).toBe(true);
    });
});
