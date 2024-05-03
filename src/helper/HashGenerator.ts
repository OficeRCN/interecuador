import * as bcrypt from "bcrypt"

export const HashGenerator = (stringMessage: string) => {
    return bcrypt.hashSync(stringMessage, 10)
}