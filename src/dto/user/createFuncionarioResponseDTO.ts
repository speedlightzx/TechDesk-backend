// import z from 'zod'

import { createFuncionario } from "./createFuncionarioDTO";

// export const createFuncionarioResponseDTO = z.object({
//     email: z.string({ required_error: "Insira um email.", invalid_type_error: "Email inválido." }).email("Email inválido."),
//     senha: z.string({ required_error: "Insira uma senha.", invalid_type_error: "Insira uma senha válida."}).min(1),
//     cargo: z.enum(["Colaborador", "Técnico", "Administrador"], { required_error: "Insira um cargo válido.", invalid_type_error: "Cargo inválido." }),
//     id_empresa: z.number({ required_error: "Insira o ID da empresa.", invalid_type_error: "Insira um ID de empresa válido."}).min(1).int()
// }).strict("Dados invalidádos.")

export interface createFuncionarioResponse {
  email: string;
  cargo: "Colaborador" | "Técnico" | "Administrador";
}

export function createFuncionarioResponseDTO(
  user: createFuncionario
): createFuncionarioResponse {
  return {
    email: user.email,
    cargo: user.cargo,
  };
}
