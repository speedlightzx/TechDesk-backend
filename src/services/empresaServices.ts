import { empresa, empresaDTO } from "../dto/empresa/empresaDTO";
import { findEmailFundador, findEmpresa, getEmpresaStatusRepository, registerEmpresaRepository,} from "../repositories/empresaRepository";
import { decodeToken } from "../utils/decodeToken";
import { HttpError } from "../utils/HttpError";
import { validateDTO } from "../utils/validateDTO";
import bcrypt from "bcryptjs"

export async function registerEmpresaService(data: empresa) {
  const validate = await validateDTO(empresaDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const empresa = await findEmpresa(data);
  if (empresa) throw new HttpError("Já existe uma empresa com esse CNPJ.", 409);

  const emailFundador = await findEmailFundador(data);
  if (emailFundador) throw new HttpError("Já existe um usuário com esse email.", 409);

  const hash = await bcrypt.hash(data.senha, 10)
  data = {
    ...data,
    senha: hash
  }

  return registerEmpresaRepository(data);
}

export async function getEmpresaStatusService(token: string) {
  const userInfo = await decodeToken(token)
  if(!userInfo) throw new HttpError("Problema na autenticação.", 500)

  return getEmpresaStatusRepository(userInfo.id_empresa);
}