import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsNotEmpty()
    @IsString()
    lastname:string

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsEmail()
    @IsNotEmpty()
    mail:string

    @IsPhoneNumber()
    @IsNotEmpty()
    phone:number
}
