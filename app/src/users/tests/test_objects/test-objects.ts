import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";

export class UserTestObejects {
    constructor(
        private readonly repository: Repository<User>
    ) {}

    async getUser(): Promise<User> {
        const createdUser = this.repository.create({
            id: 1,
            email: 'test@test.com',
            isActive: true,
            name: 'name_test',
            lastname: 'lastname_test',
            password: 'password_test',
            sessions: null
        });

        return await this.repository.save(createdUser);
    }
};