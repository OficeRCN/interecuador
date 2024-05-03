import { Request } from "express"

export interface RequestUser extends Request {
    user: {
        email: string;
        rol: string;
    }
}