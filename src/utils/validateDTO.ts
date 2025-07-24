import { ZodType } from "zod";

export async function validateDTO(DTO: ZodType, data: unknown) {
    const validate = DTO.safeParse(data)

    if(!validate.success) {
        const error = validate.error.issues[0].message;
        return { error }
    }

    return true
}