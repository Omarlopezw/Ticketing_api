import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestApplicationSetup } from '../../config/test-application-setup.module';
import { IsNull, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTestObejects } from './test_objects/test-objects';

describe('User Controller (e2e)', () => {
    let app: INestApplication;
    let setup: TestApplicationSetup;
    let userRepo: Repository<User>;
    let userTestObjects: UserTestObejects;

    beforeAll(async () => {
        setup = new TestApplicationSetup();
        const result = await setup.init();
        app = result.app;
        userRepo = app.get<Repository<User>>(getRepositoryToken(User));
        userTestObjects = new UserTestObejects(userRepo);
    }, 30000);

    afterAll(async () => {
        if (app) await app.close();
    });

    it('Application should be defined', () => {
        expect(app).toBeDefined();
    });

    it('User repo should be defined', () => {
        expect(userRepo).toBeDefined();
    })

    it('create users | Given valid userPayload When creating a user Then create a user in db and response 201 status', async () => {
        const expectedResponse = {
            name: 'test_name',
            lastname: 'test_lastname',
            email: 'test@test.com',
            password: 'test_password',
            id: 1,
            isActive: true
        };
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
        expect(response.body).toEqual(expectedResponse);
        expect(createdUser.name).toEqual(userPayload.name);
        expect(createdUser.lastname).toEqual(userPayload.lastname);
        expect(createdUser.isActive).toBeTruthy();
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

    it('deleteUserGivenValidDataDeletesTheUserAndResponsesStatusOK', async () => {
        const expectedResponse = {
            affected: 1,
            raw: []
        };
        const user = await userTestObjects.getUser();

        const response = await request(app.getHttpServer())
            .delete(`/users/${user.id}`)
            .expect(200);

        expect(response.body).toEqual(expectedResponse);
        expect(
            userRepo.findOneByOrFail({ id: user.id })
        ).rejects.toThrow();
    });

    it('deleteUserGivenNonExistentUserReturnsStatusOkNotAffectedRows', async () => {
        const expectedResponse = {
            raw: [], affected: 0
        };
        const response = await request(app.getHttpServer())
            .delete(`/users/-1`)
            .expect(200);

        expect(response.body).toEqual(expectedResponse);
    });
});