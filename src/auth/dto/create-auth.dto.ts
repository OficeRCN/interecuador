import { IsEmpty, IsEmail } from "class-validator";

export class CreateAuthDto {

    @IsEmpty()
    @IsEmail()
    email: string

    @IsEmpty()
    password: string;

}
