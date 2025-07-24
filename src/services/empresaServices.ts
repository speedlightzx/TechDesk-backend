import { empresa, empresaDTO } from "../dto/empresa/empresaDTO";
import { findEmailFundador, findEmpresa, registerEmpresaRepository,} from "../repositories/empresaRepository";
import { HttpError } from "../utils/HttpError";
import { validateDTO } from "../utils/validateDTO";

export default async function registerEmpresaService(data: empresa) {
  const validate = await validateDTO(empresaDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const empresa = await findEmpresa(data);
  if (empresa) throw new HttpError("Já existe uma empresa com esse CNPJ.", 409);

  const emailFundador = await findEmailFundador(data);
  if (emailFundador) throw new HttpError("Já existe um usuário com esse email.", 409);

  return registerEmpresaRepository(data);
}
