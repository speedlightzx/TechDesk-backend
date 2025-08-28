import { Request, Response } from "express";
import { createChamadoServices, getMyChamadosServices } from "../services/chamadoServices";

export async function createChamadoController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!
    const chamado = await createChamadoServices(req.body, token)

    res.status(201).json({ chamado });
  } catch (err: any) {
    res.status(err.code).json({ error: err.message });
  }
}

export async function getMyChamadosController(req: Request, res: Response) {
  try {
    const token = req.headers.authorization!
    const chamadosList = await getMyChamadosServices(token)

    res.status(200).json({ chamadosList });
  } catch (err: any) {
    res.status(err.code).json({ error: err.message });
  }
}