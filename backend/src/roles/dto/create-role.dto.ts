import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDTO{
    @IsNotEmpty()
    @IsString()
    role_name: string
}