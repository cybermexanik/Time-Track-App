import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email: string;

    @MinLength(6, {message:'Пароль должен содержать больше 6 символов'})
    password: string;
    
    surname: string;
    name: string;
    middlename: string;
    role:string;
}