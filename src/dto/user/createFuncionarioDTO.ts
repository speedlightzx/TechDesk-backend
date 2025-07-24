import z from 'zod'
import { cargoFuncionario } from '../../enums/cargoEnum'

export const createFuncionarioDTO = z.object({
    email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
    senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1),
    cargo: z.enum(["Colaborador", "Técnico", "Administrador"], { required_error: "Insira um cargo.", invalid_type_error: "Cargo inválido." }),
}).strict("Dados inválidados.")

export interface createFuncionario {
    email: string,
    senha: string,
    cargo: cargoFuncionario,
}