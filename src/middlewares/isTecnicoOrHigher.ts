import { Request, Response, NextFunction } from "express";
import { findFuncionarioPerId } from "../repositories/userRepository";

const secret:any = process.env.JWT_SECRET

export default async function isTecnicoOrHigher(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user

    const funcionario = await findFuncionarioPerId(user.id as number);    
    if(funcionario?.cargo == "Colaborador") {
        res.status(403).json({ error: "Você não tem permissão para realizar essa ação."});
        return
    }

    next()
}