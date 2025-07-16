import { Request, Response } from "express";
import createFuncionarioServices from "../services/userServices";
import { createFuncionarioResponse } from "../dto/user/createFuncionarioResponseDTO";

export async function createFuncionarioController(req: Request, res: Response) {
  try {
    const user = await createFuncionarioServices(req.body, req.headers.authorization?.split(" ")[1]!);

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(err.code).json({ error: err.message });
  }
}
