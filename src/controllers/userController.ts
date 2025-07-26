import { Request, Response } from "express";
import { createFuncionarioServices, deleteFuncionarioServices, getFuncionarioServices, updateFuncionarioServices } from "../services/userServices";

export async function createFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.cookies.session_token
    const user = await createFuncionarioServices(req.body, token);

    res.status(201).json({ user });
  } catch (err: any) {
    console.log(err)
    res.status(err.code).json({ error: err.message });
  }
}

export async function updateFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.cookies.session_token
    await updateFuncionarioServices(req.body, token)

    res.status(204).json()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function deleteFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.cookies.session_token
    await deleteFuncionarioServices(req.body, token)

    res.status(204).json()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function getFuncionariosController(req: Request, res: Response) {
  try {
    const token = req.cookies.session_token

    const funcionarios = await getFuncionarioServices(token)

    res.status(200).json({ funcionarios })
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}