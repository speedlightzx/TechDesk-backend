import { Request, Response } from "express";
import { validateLoginServices } from "../services/authServices";

export async function validateLoginController(req:Request, res:Response) {
        try {
            const resultado = await validateLoginServices(req.body)

            const message = "Login realizado com sucesso."
            const token = resultado.token

            res.status(200).json({message, token})
        } catch(err:any) {
            res.status(err.code).json({ error: err.message})
        }
}