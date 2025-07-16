import z from 'zod'

export const createFuncionarioDTO = z.object({
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
    senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1),
    cargo: z.enum(["Colaborador", "Técnico", "Administrador"], { required_error: "Insira um cargo.", invalid_type_error: "Cargo inválido." }),
    id_empresa: z.number({ required_error: "Insira o ID da empresa.", invalid_type_error: "Insira um ID de empresa válido."}).min(1).int()
}).strict("Dados inválidados.")

export interface createFuncionario {
    email: string,
    senha: string,
    cargo: "Colaborador" | "Técnico" | "Administrador",
    id_empresa: number
}