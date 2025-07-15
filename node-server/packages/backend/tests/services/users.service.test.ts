import { IUsers } from '@movies/interfaces';
import { UsersBuilder } from '@src/models/users.models';
import { UsersService } from '@src/services/mongodb/users.services';
import { Database } from '@utils/database';

let defaultUser: IUsers;

beforeAll(async () => {
    defaultUser = UsersBuilder.create()
        .setName('test')
        .setPassword('test')
        .setEmail('test')
        .setRole('test')
        .build();

    await Database.getInstance();
});

beforeEach(async () => {
    await Database.dropDatabase();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('UsersService', () => {
    it('Tạo mới một users', async () => {
        const usersService = new UsersService();
        const user = await usersService.create(defaultUser);

        expect(user.username).toBe(defaultUser.username);
        expect(user.password).toBe(defaultUser.password);
        expect(user.email).toBe(defaultUser.email);
        expect(user.role).toBe(defaultUser.role);
    });

    it('Update một users', async () => {
        const usersService = new UsersService();

        const user = await usersService.create(defaultUser);
        user.email = "updated email";

        const updateUser = await usersService.update(user);

        expect(updateUser.email).toBe(user.email);
    });

    it('Lấy danh sach users', async () => {
        const usersService = new UsersService();

        const user = await usersService.create(defaultUser);

        const users = await usersService.getAll();
        expect(users).toEqual(expect.arrayContaining([user]));
    });

    it('Lấy một users', async () => {
        const usersService = new UsersService();

        const user = await usersService.create(defaultUser);

        const getUser = await usersService.get(user.id);
        expect(getUser).toEqual(user);
    });

    it('Xóa một users', async () => {
        const usersService = new UsersService();
        const user = await usersService.create(defaultUser);
        const isDeleted = await usersService.delete(user);
        expect(isDeleted).toBe(true);
    });
});
