import { IsEmpty, Length } from "class-validator";

export class CreateRoleDto {
    @IsEmpty()
    rol: string;

    @IsEmpty()
    id_rol: number;
}
