import {Request, Response} from 'express'
import cadastrarEmpresaService from '../services/empresaServices'

export async function cadastrarEmpresaController(req:Request, res:Response)  {
    try {
        const resultado = await cadastrarEmpresaService(req.body)
        res.status(201).json({message: "Empresa criada com sucesso."})
    } catch(err:any) {
        console.log(err)
        res.status(err.code).json({ message: err.message})
    }
}