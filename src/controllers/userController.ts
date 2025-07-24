import { Request, Response } from "express";
import { createFuncionarioServices, deleteFuncionarioServices, updateFuncionarioServices } from "../services/userServices";

export async function createFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1]!
    const user = await createFuncionarioServices(req.body, token);

    res.status(201).json({ user });
  } catch (err: any) {
    console.log(err)
    res.status(err.code).json({ error: err.message });
  }
}

export async function updateFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1]!
    await updateFuncionarioServices(req.body, token)

    res.status(204).json()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}

export async function deleteFuncionarioController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1]!
    await deleteFuncionarioServices(req.body, token)

    res.status(204).json()
  }catch (err: any) {
    res.status(err.code).json({ error: err.message })
  }
}