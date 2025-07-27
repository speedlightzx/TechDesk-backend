import {Request, Response} from 'express'
import registerEmpresaService from '../services/empresaServices'

export async function registerEmpresaController(req:Request, res:Response)  {
    try {

        await registerEmpresaService(req.body)
        const message = "Empresa criada com sucesso."

        res.status(201).json({message})
    } catch(err:any) {
        console.log(err)
        res.status(err.code).json({ error: err.message})
    }
}