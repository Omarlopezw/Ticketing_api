export type JwtPayload = {
    idSession: number[]; // @todo: revisar si corresponde array en este campo
    idUser: number;
    //idUserData: number; // @todo: revisar ya que la misma info esta en tabla user
    email: string; // @todo: revisar utilidad de este campo
};