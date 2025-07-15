import { ICategories } from "@movies/interfaces";

export class Categories implements ICategories {
    id: string;
    name: string;
    slug: string;
}

export class CategoriesBuilder {
    private categories: ICategories;

    private constructor() { this.categories = new Categories(); }

    setName(name: string): CategoriesBuilder {
        this.categories.name = name;
        return this;
    }

    setSlug(slug: string): CategoriesBuilder {
        this.categories.slug = slug;
        return this;
    }

    static create(): CategoriesBuilder {
        return new CategoriesBuilder();
    }

    build(): ICategories {
        return this.categories;
    }
}
