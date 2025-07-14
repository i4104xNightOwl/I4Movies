import { IUsers } from '@movies/interfaces';
import { IUsersService } from '@interface/services/users.services';
import { UsersDB } from './migrations/users.schema';
import { Users } from '@src/models/users.models';
import { plainToInstance, instanceToPlain } from 'class-transformer';

function transformUser(doc: any): IUsers {
    const plain = doc.toObject();
    plain.id = plain._id.toString();
    delete plain._id;
    delete plain.__v;
    return plainToInstance(Users, plain);
}

export class UsersService implements IUsersService {
    async get(id: string | number): Promise<IUsers> {
        const user = await UsersDB.findById(id).orFail();
        return transformUser(user);
    }

    async getAll(): Promise<IUsers[]> {
        const users = await UsersDB.find();
        return users.map(transformUser);
    }

    async create(data: IUsers): Promise<IUsers> {
        const newUser = new UsersDB(data);
        const saved = await newUser.save();
        return transformUser(saved);
    }

    async update(data: IUsers): Promise<IUsers> {
        const plainData = instanceToPlain(data);
        const updated = await UsersDB.findByIdAndUpdate(
            data.id,
            plainData,
            { new: true, runValidators: true }
        ).orFail();

        return transformUser(updated);
    }

    async delete(data: IUsers): Promise<boolean> {
        const deleted = await UsersDB.findByIdAndDelete(data.id);
        return !!deleted;
    }
}
