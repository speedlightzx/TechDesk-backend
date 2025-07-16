import { createFuncionario } from "./createFuncionarioDTO";

export interface createFuncionarioResponse {
  email: string;
  cargo: "Colaborador" | "Técnico" | "Administrador";
}

export function createFuncionarioResponseDTO(user: createFuncionario): createFuncionarioResponse {
  return {
    email: user.email,
    cargo: user.cargo,
  };
}
