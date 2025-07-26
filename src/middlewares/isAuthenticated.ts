import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"

const secret:any = process.env.JWT_SECRET

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.session_token
    
    if(!token) {
        res.status(401).json({ error: "Token não encontrado."})
        return
    }

    try {
        jwt.verify(token, secret)
        const decode = jwt.decode(token, secret)
        res.locals.user = decode
        next()
    } catch(err) {
        console.log(err)
        //res.clearCookie("session_token")
        res.status(401).json({ error: "Token inválido ou expirado." })
    }
}