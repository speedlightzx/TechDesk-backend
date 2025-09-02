import { createFuncionario, createFuncionarioDTO, } from "../dto/user/createFuncionarioDTO";
import { deleteFuncionario, deleteFuncionarioDTO } from "../dto/user/deleteFuncionarioDTO";
import { putMyAccount } from "../dto/user/putMyAccountDTO";
import { updateFuncionario, updateFuncionarioDTO } from "../dto/user/updateFuncionarioDTO";
import { createFuncionarioRepository, deleteFuncionarioRepository, deleteMyAccountRepository, findFuncionarioPerEmail, findFuncionarioPerId, getFuncionariosRepository, getMyAccountRepository, putMyAccountRepository, updateFuncionarioRepository } from "../repositories/userRepository";
import { decodeToken } from "../utils/decodeToken";
import { HttpError } from "../utils/HttpError";
import { validateDTO } from "../utils/validateDTO";
import bcrypt from 'bcryptjs'

export async function createFuncionarioServices(data: createFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(createFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const funcionario = await findFuncionarioPerEmail(data);
  if (funcionario) throw new HttpError("Já existe um funcionário cadastrado com esse email.", 409);

  const hash = await bcrypt.hash(data.senha, 10)

    data = {
    ...data,
    senha: hash
  }

  return createFuncionarioRepository(data, userInfo.id_empresa);
}

export async function updateFuncionarioServices(data: updateFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(updateFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const user = await findFuncionarioPerId(userInfo.id)
  const funcionario = await findFuncionarioPerEmail(data);

  if(user?.id_empresa !== funcionario?.id_empresa) throw new HttpError("Você não tem permissão para realizar essa ação.", 403)
  if (!funcionario) throw new HttpError("Não foi encontrado nenhum funcionário com esse email.", 404);
  
  if(data.senha) {
    const hash = await bcrypt.hash(data.senha, 10)
    data = {
      ...data,
      senha: hash
    }
  }

  return updateFuncionarioRepository(data);
}

export async function deleteFuncionarioServices(data: deleteFuncionario, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)
  
  const validate = await validateDTO(deleteFuncionarioDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const user = await findFuncionarioPerId(userInfo.id)
  const funcionario = await findFuncionarioPerEmail(data);

  if(user?.id == funcionario?.id_empresa) throw new HttpError("Você não pode se deletar!", 403)
  if(!funcionario) throw new HttpError("Não foi encontrado nenhum funcionário com esse email.", 404);
  if(user?.id_empresa !== funcionario?.id_empresa) throw new HttpError("Você não tem permissão para realizar essa ação.", 403)

  return deleteFuncionarioRepository(data);
}

export async function getFuncionarioServices(token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  return getFuncionariosRepository(userInfo.id_empresa);
}

export async function getMyAccountServices(token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  return getMyAccountRepository(userInfo.id);
}

export async function putMyAccountServices(data:putMyAccount, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  if(data.senha) {
    const hash = await bcrypt.hash(data.senha, 10)
    data = {
      ...data,
      senha: hash
    }
  }

  return putMyAccountRepository(data, userInfo.id);
}

export async function deleteMyAccountServices(data:putMyAccount, token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  return deleteMyAccountRepository(userInfo.id)
}