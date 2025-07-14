import UsersService from '@src/services/mongodb/users.services';
import Database from '../../utils/database';
import { IUsers } from '@movies/interfaces';

let defaultUser: IUsers = {
    username: 'khoa',
    password: '123',
    email: 'khoa@test.com',
    role: 'admin'
}

beforeAll(async () => {
    await Database.getInstance();
});

afterAll(async () => {
    await Database.disconnect();
});

describe('UsersService', () => {
    const userService = new UsersService();

    it('Tạo mới một users', async () => {
        const user = await userService.create(defaultUser);
        expect(user.username).toBe(defaultUser.username);
        expect(user.password).toBe(defaultUser.password);
        expect(user.email).toBe(defaultUser.email);
        expect(user.role).toBe(defaultUser.role);
    });
});
