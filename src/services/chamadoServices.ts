import { createChamado, createChamadoDTO } from "../dto/chamado/createChamadoDTO";
import { createChamadoRepository, getMyChamadosRepository } from "../repositories/chamadoRepository";
import { decodeToken } from "../utils/decodeToken";
import { HttpError } from "../utils/HttpError";
import { validateDTO } from "../utils/validateDTO";

export async function createChamadoServices(data: createChamado, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(createChamadoDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  return createChamadoRepository(data, userInfo.id_empresa, userInfo.id);
}

export async function getMyChamadosServices(token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  return getMyChamadosRepository(userInfo.id);
}