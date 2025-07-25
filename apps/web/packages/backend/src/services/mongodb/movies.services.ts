import { IMovies, ICategories } from '@movies/interfaces';
import { Movies } from '@src/models/movies.models';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { CategoriesDB } from './migrations/categories.schema';
import { MoviesDB } from './migrations/movies.schema';

export class MoviesService {
    async get(id: string | number): Promise<IMovies> {
        const movie = await MoviesDB.findById(id).orFail();
        const categories = await this.populateCategories(movie.category);
        return this.transformMovie(movie, categories);
    }

    async getAll(): Promise<IMovies[]> {
        const movies = await MoviesDB.find();

        const allMovies: IMovies[] = [];

        for (const movie of movies) {
            const categories = await this.populateCategories(movie.category);
            allMovies.push(this.transformMovie(movie, categories));
        }

        return allMovies;
    }

    async create(data: IMovies): Promise<IMovies> {
        const categoryIds = data.category.map(c => c.id?.toString());
        const created = new MoviesDB({ ...data, category: categoryIds });
        const saved = await created.save();

        const categories = await this.populateCategories(categoryIds);
        return this.transformMovie(saved, categories);
    }

    async update(data: IMovies): Promise<IMovies> {
        const categoryIds = data.category.map(c => c.id?.toString());
        const plainData = { ...instanceToPlain(data), category: categoryIds };

        const updated = await MoviesDB.findByIdAndUpdate(
            data.id,
            plainData,
            { new: true, runValidators: true }
        ).orFail();

        const categories = await this.populateCategories(categoryIds);
        return this.transformMovie(updated, categories);
    }

    async delete(data: IMovies): Promise<boolean> {
        const deleted = await MoviesDB.findByIdAndDelete(data.id);
        return !!deleted;
    }

    private async populateCategories(categoryIds: string[]): Promise<ICategories[]> {
        const categories = await CategoriesDB
            .find({ _id: { $in: categoryIds } })
            .lean<{ _id: string; __v?: number; name: string; slug: string }[]>();

        const result: ICategories[] = categories.map(category => {
            const transformed: ICategories = {
                id: category._id.toString(),
                name: category.name,
                slug: category.slug,
            };
            return transformed;
        });

        return result;
    }

    private transformMovie(doc: any, populatedCategories?: ICategories[]): IMovies {
        const plain = doc.toObject({ virtuals: false });
        plain.id = plain._id.toString();
        plain.category = populatedCategories || plain.category;
        delete plain._id;
        delete plain.__v;

        return plainToInstance(Movies, plain);
    }
}
