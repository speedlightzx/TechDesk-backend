import {Request, Response} from 'express'
import { getEmpresaStatusService, registerEmpresaService } from '../services/empresaServices'

export async function registerEmpresaController(req:Request, res:Response)  {
    try {

        await registerEmpresaService(req.body)
        const message = "Empresa criada com sucesso."

        res.status(201).json({message})
    } catch(err:any) {
        res.status(err.code).json({ error: err.message})
    }
}

export async function getEmpresaStatusController(req:Request, res:Response)  {
    try {
        const token = req.headers.authorization!
        const status = await getEmpresaStatusService(token)

        res.status(201).json({status})
    } catch(err:any) {
        res.status(err.code).json({ error: err.message})
    }
}