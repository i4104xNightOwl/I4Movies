import { IUsers } from "@movies/interfaces";
import { IUsersService } from '@interface/services/users.services';

export class UsersService implements IUsersService {
    get(id: string): Promise<IUsers> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IUsers> {
        throw new Error("Method not implemented.");
    }
    create(data: IUsers): Promise<IUsers> {
        throw new Error("Method not implemented.");
    }
    update(data: IUsers): Promise<IUsers> {
        throw new Error("Method not implemented.");
    }
    delete(data: IUsers): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
