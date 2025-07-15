import { ICategories } from '@movies/interfaces';
import { ICategoriesService } from '@interface/services/categories.services';
import { Categories } from '@src/models/categories.models';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { CategoriesDB } from './migrations/categories.schema';

export class CategoriesService implements ICategoriesService {
    async get(id: string | number): Promise<ICategories> {
        const category = await CategoriesDB.findById(id).orFail();
        return this.transformCategory(category);
    }

    async getAll(): Promise<ICategories[]> {
        const categories = await CategoriesDB.find();
        return categories.map(this.transformCategory);
    }

    async create(data: ICategories): Promise<ICategories> {
        const created = new CategoriesDB(data);
        const saved = await created.save();
        return this.transformCategory(saved);
    }

    async update(data: ICategories): Promise<ICategories> {
        const plainData = instanceToPlain(data);
        const updated = await CategoriesDB.findByIdAndUpdate(
            data.id,
            plainData,
            { new: true, runValidators: true }
        ).orFail();

        return this.transformCategory(updated);
    }

    async delete(data: ICategories): Promise<boolean> {
        const deleted = await CategoriesDB.findByIdAndDelete(data.id);
        return !!deleted;
    }

    private transformCategory(doc: any): ICategories {
        const plain = doc.toObject();
        plain.id = plain._id.toString();
        delete plain._id;
        delete plain.__v;
        return plainToInstance(Categories, plain);
    }

}
