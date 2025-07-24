import z from 'zod'
import { cargoFuncionario } from '../../enums/cargoEnum'

export const updateFuncionarioDTO = z.object({
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
    senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1).optional(),
    cargo: z.enum(["Colaborador", "Técnico", "Administrador"], { required_error: "Insira um cargo.", invalid_type_error: "Cargo inválido." }).optional(),
}).strict("Dados inválidados.")

export interface updateFuncionario {
    email: string,
    senha: string,
    cargo: cargoFuncionario
}