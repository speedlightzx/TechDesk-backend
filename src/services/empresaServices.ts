import { empresa, empresaDTO } from "../dto/empresa/empresaDTO";
import { findEmailFundador, findEmpresa, registerEmpresaRepository,} from "../repositories/empresaRepository";
import { HttpError } from "../utils/HttpError";

export default async function registerEmpresaService(data: empresa) {
  const validate = empresaDTO.safeParse(data);

  if (!validate.success) {
    const error = validate.error.issues[0].message;
    throw new HttpError(error, 400);
  }

  const empresa = await findEmpresa(data);
  if (empresa) throw new HttpError("Já existe uma empresa com esse CNPJ.", 409);

  const emailFundador = await findEmailFundador(data);
  if (emailFundador) throw new HttpError("Já existe um usuário com esse email.", 409);

  return registerEmpresaRepository(data);
}
