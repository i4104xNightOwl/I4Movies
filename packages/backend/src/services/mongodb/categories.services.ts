import { ICategoriesService } from '@interface/services/categories.services';
import { ICategories } from '@movies/interfaces';

export class CategoriesService implements ICategoriesService {
    get(id: string): Promise<ICategories> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<ICategories> {
        throw new Error('Method not implemented.');
    }
    create(data: ICategories): Promise<ICategories> {
        throw new Error('Method not implemented.');
    }
    update(data: ICategories): Promise<ICategories> {
        throw new Error('Method not implemented.');
    }
    delete(data: ICategories): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
