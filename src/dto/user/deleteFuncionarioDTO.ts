import z from 'zod'

export const deleteFuncionarioDTO = z.object({
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
}).strict("Dados inválidados.")

export interface deleteFuncionario {
    email: string,
}