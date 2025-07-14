import { IMoviesService } from '@interface/services/movies.services';
import { IMovies } from '@movies/interfaces';

export class MoviesService implements IMoviesService {
    get(id: string | number): Promise<IMovies> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<IMovies> {
        throw new Error('Method not implemented.');
    }
    create(data: IMovies): Promise<IMovies> {
        throw new Error('Method not implemented.');
    }
    update(data: IMovies): Promise<IMovies> {
        throw new Error('Method not implemented.');
    }
    delete(data: IMovies): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
