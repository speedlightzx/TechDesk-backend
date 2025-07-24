import { createFuncionario, createFuncionarioDTO, } from "../dto/user/createFuncionarioDTO";
import { deleteFuncionario, deleteFuncionarioDTO } from "../dto/user/deleteFuncionarioDTO";
import { updateFuncionario, updateFuncionarioDTO } from "../dto/user/updateFuncionarioDTO";
import { createFuncionarioRepository, deleteFuncionarioRepository, findFuncionarioPerEmail, findFuncionarioPerId, updateFuncionarioRepository } from "../repositories/userRepository";
import { decodeToken } from "../utils/decodeToken";
import { HttpError } from "../utils/HttpError";
import { validateDTO } from "../utils/validateDTO";

export async function createFuncionarioServices(data: createFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(createFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const funcionario = await findFuncionarioPerEmail(data);
  if (funcionario) throw new HttpError("Já existe um funcionário cadastrado com esse email.", 409);

  return createFuncionarioRepository(data, userInfo.id_empresa);
}

export async function updateFuncionarioServices(data: updateFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(updateFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const user = await findFuncionarioPerId(userInfo.id)
  const funcionario = await findFuncionarioPerEmail(data);

  console.log(user, funcionario)
  if(user?.id_empresa !== funcionario?.id_empresa) throw new HttpError("Você não tem permissão para realizar essa ação.", 401)
  if (!funcionario) throw new HttpError("Não foi encontrado nenhum funcionário com esse email.", 403);

  return updateFuncionarioRepository(data);
}

export async function deleteFuncionarioServices(data: deleteFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(deleteFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const user = await findFuncionarioPerId(userInfo.id)
  const funcionario = await findFuncionarioPerEmail(data);

  if(user?.id == funcionario?.id_empresa) throw new HttpError("Você não pode se deletar!", 401)
  if(!funcionario) throw new HttpError("Não foi encontrado nenhum funcionário com esse email.", 403);
  if(user?.id_empresa !== funcionario?.id_empresa) throw new HttpError("Você não tem permissão para realizar essa ação.", 401)

  return deleteFuncionarioRepository(data);
}