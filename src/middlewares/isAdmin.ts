import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"
import { findFuncionarioPerId } from "../repositories/userRepository";
import { HttpError } from "../utils/HttpError";

const secret:any = process.env.JWT_SECRET

export default async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user

    const admin = await findFuncionarioPerId(user.id as number);    
    if (admin?.cargo != "Administrador") {
        res.status(401).json({ error: "Você não tem permissão para realizar essa ação."});
        return
    }

    next()
}