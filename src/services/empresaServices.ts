import { empresa, empresaDTO } from "../dto/empresaDTO"
import cadastrarEmpresaRepository, { buscarEmailFundadorRepository, buscarEmpresaRepository } from "../repositories/empresaRepository"
import { HttpError } from "../utils/HttpError"

export default async function cadastrarEmpresaService(data:empresa) {
    const validate = empresaDTO.safeParse(data)

    if(!validate.success) {
        const error = validate.error.issues[0].message
        console.log(validate.error.issues)
        throw new HttpError(error, 400)
    }

    const empresa = await buscarEmpresaRepository(data)
    if(empresa) throw new HttpError('Já existe uma empresa com esse CNPJ.', 409)
    
    const emailFundador = await buscarEmailFundadorRepository(data)
    if(emailFundador) throw new HttpError('Já existe um usuário com esse email.', 409)

    return cadastrarEmpresaRepository(data)
}