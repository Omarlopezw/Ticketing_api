import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Session } from "./entities/session.entity";
import { LoginDto } from "./dto/login.dto";
import { User } from "../users/entities/user.entity";


type RefreshToken = string;
type AccessToken = string;

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Session)
        private sessionRepository: Repository<Session>
    ) {}

    /**
     * 
     * @param loginDto 
     * 
     * @return AccessToken
     */
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // validate user credentials
        // if valid, create a new session and generate access and refresh tokens

        const user: User = await this.userRepository.findOneOrFail({ 
            where: { 
                email: email,
            },
            select: [
                'password',
                'id',
                'email',
                'name',
                'sessions',
                'userData'
            ],
            relations: ['sessions', 'userData']
        });

        /** todo, hacer con bcrypt un modulo de hasheo. */

    }

    async logout() {}
    async refresh() {}
}