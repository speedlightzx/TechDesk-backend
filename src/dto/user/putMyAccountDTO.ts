import z from 'zod'

export const deleteFuncionarioDTO = z.object({
    nome: z.string({ invalid_type_error: "Tipo de nome inválido." }).optional(),
    senha: z.string({ invalid_type_error: "Tipo de senha inválido"  }).min(1).optional()
}).strict("Dados inválidados.")

export interface putMyAccount {
    nome?: string,
    senha?: string
}