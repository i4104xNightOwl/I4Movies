import { IUsers } from "@movies/interfaces";

export class Users implements IUsers {
    id: string | number;
    username: string;
    password: string;
    email: string;
    role: string;
}

export class UsersBuilder {
    private users: IUsers;
    private constructor() { this.users = new Users(); }

    setName(name: string): UsersBuilder {
        this.users.username = name;
        return this;
    }

    setPassword(password: string): UsersBuilder {
        this.users.password = password;
        return this;
    }

    setEmail(email: string): UsersBuilder {
        this.users.email = email;
        return this;
    }

    setRole(role: string): UsersBuilder {
        this.users.role = role;
        return this;
    }

    static create(): UsersBuilder { return new UsersBuilder(); }
    build(): IUsers { return this.users; }
}
