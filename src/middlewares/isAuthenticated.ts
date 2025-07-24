import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"

const secret:any = process.env.JWT_SECRET

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization
    
    if(!tokenHeader || !tokenHeader.startsWith("Bearer")) {
        res.status(401).json({ error: "Token não encontrado."})
        return
    }

    const token = tokenHeader.split(" ")[1]

    try {
        jwt.verify(token, secret)
        const decode = jwt.decode(token, secret)
        res.locals.user = decode
        next()
    } catch(err) {
        res.status(401).json({ error: "Token inválido ou expirado." })
    }
}