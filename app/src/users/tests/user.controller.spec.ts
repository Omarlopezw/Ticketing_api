// test/user/user.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestDbSetup } from '../../config/test-db-setup.module';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('User Controller (e2e)', () => {
    let app: INestApplication;
    let setup: TestDbSetup;
    let userRepo: Repository<User>;

    beforeAll(async () => {
        setup = new TestDbSetup();
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
        const expectedResponse = {
            name: 'test_name',
            lastname: 'test_lastname',
            email: 'test@test.com',
            password: 'test_password',
            id: 1,
            isActive: true
        };
        const userPayload = {
            email: 'test@test.com',
            name: 'test_name',
            lastname: 'test_lastname',
            password: 'test_password',
            phone: 1234567890,
            username: 'test_username',
            mail: 'test@test.com'
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(userPayload)
            .expect(201);

        const createdUser: User = await userRepo.findOneOrFail({ where: { email: userPayload.email } });
        expect(response.body).toEqual(expectedResponse);
        expect(createdUser.email).toEqual(expectedResponse.email);
        expect(createdUser.isActive).toBeTruthy();
        expect(createdUser.lastname).toEqual(expectedResponse.lastname);
        expect(createdUser.name).toEqual(expectedResponse.name);
    });

    it('create users | Given incorrect userPayload When creating a user Then return a bad request', async () => {
        const expectedResponse = {
            name: 'test_name',
            lastname: 'test_lastname',
            email: 'test@test.com',
            password: 'test_password',
            id: 1,
            isActive: true
        };
        const userPayload = {
            email: 'test@test.com',
            name: 'test_name',
            password: 'test_password',
            phone: 1234567890,
            username: 'test_username',
            mail: 'test1@test.com'
        };

        const response = await request(app.getHttpServer())
            .post('/users')
            .send(userPayload)
            .expect(201);

        const createdUser: User = await userRepo.findOneOrFail({ where: { email: userPayload.email } });
        expect(response.body).toEqual(expectedResponse);
        expect(createdUser.email).toEqual(expectedResponse.email);
        expect(createdUser.isActive).toBeTruthy();
        expect(createdUser.lastname).toEqual(expectedResponse.lastname);
        expect(createdUser.name).toEqual(expectedResponse.name);
    });
});