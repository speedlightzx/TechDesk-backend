import * as jwt from "jsonwebtoken";
import { HttpError } from "./HttpError";

const secret: any = process.env.JWT_SECRET;

interface decode {
    id: number,
    id_empresa: number
}

export async function decodeToken(token: string): Promise<decode> {
    const userInfo:any = jwt.decode(token, secret)

    const id = userInfo.id
    const id_empresa = userInfo.id_empresa

    return { id, id_empresa }
}