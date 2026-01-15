import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestApplicationSetup } from '../../config/test-application-setup.module';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('User Controller (e2e)', () => {
    let app: INestApplication;
    let setup: TestApplicationSetup;
    let userRepo: Repository<User>;

    beforeAll(async () => {
        setup = new TestApplicationSetup();
        const result = await setup.init();
        app = result.app;
        userRepo = app.get<Repository<User>>(getRepositoryToken(User));
    }, 30000);

    afterAll(async () => {
        if (app) await app.close();
    });

    it('User repo should be defined', () => {
        expect(userRepo).toBeDefined();
    })

    it('create users | Given valid userPayload When creating a user Then create a user in db and response 201 status', async () => {
        const userPayload = {
            name: 'test_name',
            lastname: 'test_lastname',
            mail: 'test@test.com',
            password: 'test_password',
            phone: '+1234567890',
            username: 'test_username'
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(userPayload)
            .expect(201);

        const createdUser: User = await userRepo.findOneOrFail({ where: { email: userPayload.mail } });
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(userPayload.name);
        expect(response.body.lastname).toEqual(userPayload.lastname);
        expect(response.body.isActive).toBeTruthy();
        expect(createdUser.email).toEqual(userPayload.mail);
    });

    it('should reject creation with invalid data', async () => {
        const expectedResponse = {
            error: "Bad Request",
            message: [
                'lastname must be a string',
                'lastname should not be empty',
                'mail must be an email'
            ],
            statusCode: 400,
        };
        const invalidPayload = {
            name: 'test_name',
            phone: '+1234567890',
            username: 'test_username',
            password: 'test_password',
            mail: 'invalid-email'
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(invalidPayload)
            .expect(400);

        expect(response.body).toEqual(expectedResponse);
    });
});