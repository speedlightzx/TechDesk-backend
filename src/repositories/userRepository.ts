import { PrismaClient } from "@prisma/client";
import { createFuncionario } from "../dto/user/createFuncionarioDTO";
const prisma = new PrismaClient();

export async function createFuncionarioRepository(data: createFuncionario) {
  return await prisma.usuarios.create({
    data: {
      email: data.email,
      cargo: data.cargo,
      senha: data.senha,
      id_empresa: data.id_empresa,
    },
  });
}

export async function findFuncionarioPerEmail(data: createFuncionario) {
  return await prisma.usuarios.findUnique({ where: { email: data.email } });
}

export async function findFuncionarioPerId(id: number) {
  return await prisma.usuarios.findUnique({ where: { id: id } });
}
