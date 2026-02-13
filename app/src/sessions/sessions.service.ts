import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Session } from "./entities/session.entity";
import { LoginDto } from "./dto/login.dto";
import { User } from "../users/entities/user.entity";
import { Hasher } from "../hasher/hash";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from '../sessions/types/payload.type';

type RefreshToken = string;
type AccessToken = string;

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,

        private hasher: Hasher,

        private jwtService: JwtService
    ) { }

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
                'sessions'
                //'userData'
            ],
            relations: ['sessions', 'userData']
        });
        console.log(user)
        const isMatch = await this.hasher.compareHash(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const { accessToken, refreshToken } = this.createSessionTokens(user);

        return { accessToken, refreshToken };
    }
    private createSessionTokens(user: User) {

        let idSessions = [];
        user.sessions === undefined ? true : user.sessions.forEach(idSession => idSessions.push(idSession));

        let payload: JwtPayload = {
            idSession: idSessions,
            idUser: user.id,
            //idUserData: user.userData.id,
            email: user.email
        }
        const accessToken: AccessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '1d'
        });
        const refreshToken: RefreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '15d'
        });

        return { accessToken, refreshToken }
    }
    async logout() { }
    async refresh() { }
}