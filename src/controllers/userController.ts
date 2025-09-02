import { Request, Response } from "express";
import { createFuncionarioServices, deleteFuncionarioServices, getFuncionarioServices, getMyAccountServices, putMyAccountServices, updateFuncionarioServices } from "../services/userServices";

export async function createFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!
    const user = await createFuncionarioServices(req.body, token);

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(err.code).json({ error: err.message });
  }
}

export async function updateFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!
    await updateFuncionarioServices(req.body, token)

    res.status(204).json()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function deleteFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!
    await deleteFuncionarioServices(req.body, token)

    res.status(204).end()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function getFuncionariosController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!

    const funcionarios = await getFuncionarioServices(token)

    res.status(200).json({ funcionarios })
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function getMyAccountController(req:Request, res:Response) {
  try {
    const token = req.headers.authorization!
    const user = await getMyAccountServices(token)
    res.status(200).json({ user })

  } catch(err:any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function putMyAccountController(req:Request, res:Response) {
  try {
    const token = req.headers.authorization!
    await putMyAccountServices(req.body, token)
    res.status(204).end()

  } catch(err:any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function deleteMyAccountController(req:Request, res:Response) {
  try {
    const token = req.headers.authorization!
    await deleteFuncionarioServices(req.body, token)
    res.status(204).end()

  } catch(err:any) {
    res.status(err.code).json({ error: err.message })
  }
}