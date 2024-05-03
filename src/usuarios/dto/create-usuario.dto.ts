import { IsEmail, IsEmpty, Length, Max, Min } from "class-validator";

export class CreateUsuarioDto {

    @IsEmpty()
    @IsEmail()
    email: string;

    @IsEmpty()
    @Min(10)
    @Max(12)
    password: string;

}
