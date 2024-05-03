import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../enums/rol.enum";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard.guard";
import { Roles } from "./roles.decorator";

export function Auth(role: Role) {
    return applyDecorators(
        Roles(role),
        UseGuards(JwtAuthGuard, RolesGuard),
    )
}