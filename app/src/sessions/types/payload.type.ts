export type JwtPayload = {
    idSession: number;
    idUser: number;
    idUserData: number;
    email: string; // @todo: revisar utilidad de este campo
};