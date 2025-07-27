import { Request, Response, NextFunction } from "express";
import { findFuncionarioPerId } from "../repositories/userRepository";

const secret:any = process.env.JWT_SECRET

export default async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user

    const admin = await findFuncionarioPerId(user.id as number);    
    if (!admin?.cargo.includes("Administrador") || !admin?.cargo.includes("CEO")) {
        res.status(403).json({ error: "Você não tem permissão para realizar essa ação."});
        return
    }

    next()
}