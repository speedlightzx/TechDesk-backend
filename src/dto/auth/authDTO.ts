import z from 'zod'

export const authDTO = z.object({
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
    senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1),
}).strict("Dados inválidados.")

export interface auth {
    email: string,
    senha: string
}