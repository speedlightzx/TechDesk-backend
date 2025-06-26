import z from 'zod'

export const empresaDTO = z.object({
    nome: z.string({ required_error: "Insira um nome para a empresa.", invalid_type_error: "Insira um nome válido." }).min(1),
    cnpj: z.number({ required_error: "Insira um CNPJ.", invalid_type_error: "Insira um CNPJ válido."}).min(1),
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
    senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1),
}).strict("Dados inválidados.")

export interface empresa {
    nome: string,
    cnpj: number,
    email: string,
    senha: string
}