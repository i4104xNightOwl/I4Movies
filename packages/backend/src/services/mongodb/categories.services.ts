// services/mongodb/categories.services.ts
import { ICategories } from '@movies/interfaces';
import { ICategoriesService } from '@interface/services/categories.services';
import { Categories } from '@src/models/categories.models';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { CategoriesDB } from './migrations/categories.schema';

function transformCategory(doc: any): ICategories {
    const plain = doc.toObject();
    plain.id = plain._id.toString();
    delete plain._id;
    delete plain.__v;
    return plainToInstance(Categories, plain);
}

export class CategoriesService implements ICategoriesService {
    async get(id: string | number): Promise<ICategories> {
        const category = await CategoriesDB.findById(id).orFail();
        return transformCategory(category);
    }

    async getAll(): Promise<ICategories[]> {
        const categories = await CategoriesDB.find();
        return categories.map(transformCategory);
    }

    async create(data: ICategories): Promise<ICategories> {
        const created = new CategoriesDB(data);
        const saved = await created.save();
        return transformCategory(saved);
    }

    async update(data: ICategories): Promise<ICategories> {
        const plainData = instanceToPlain(data);
        const updated = await CategoriesDB.findByIdAndUpdate(
            data.id,
            plainData,
            { new: true, runValidators: true }
        ).orFail();

        return transformCategory(updated);
    }

    async delete(data: ICategories): Promise<boolean> {
        const deleted = await CategoriesDB.findByIdAndDelete(data.id);
        return !!deleted;
    }
}
