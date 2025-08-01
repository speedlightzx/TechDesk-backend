import { PrismaClient } from "@prisma/client";
import { createFuncionario } from "../dto/user/createFuncionarioDTO";
import { updateFuncionario } from "../dto/user/updateFuncionarioDTO";
import { deleteFuncionario } from "../dto/user/deleteFuncionarioDTO";
const prisma = new PrismaClient();

export async function createFuncionarioRepository(data: createFuncionario, id_empresa:number) {
  return await prisma.usuarios.create({
    data: {
      nome: data.email.split("@")[0],
      email: data.email,
      cargo: data.cargo,
      senha: data.senha,
      id_empresa: id_empresa,
    },
    select: {
      email: true,
      cargo: true
    }
  });
}

export async function updateFuncionarioRepository(data:updateFuncionario) {
  return await prisma.usuarios.update({ 
    where: { email: data.email }, 
    data: {
      cargo: data.cargo,
      senha: data.senha
    },
    select: {
      email: true,
      cargo: true
    }
  })
}

export async function getFuncionariosRepository(id:number) {
  return await prisma.usuarios.findMany({ 
    where: { id_empresa: id },
    select: {
      email: true,
      cargo: true
    }
   })
}

export async function myAccountRepository(id:number) {
  return await prisma.usuarios.findUnique({
    where: { id: id },
    select: {
      email: true,
      cargo: true,
      empresa: {
        select: {
          nome: true
        }
      },
      fundador: {
        select: {
          nome: true,
          cnpj: true
        }
      }
    }
  })
}

export async function deleteFuncionarioRepository(data: deleteFuncionario) {
  return await prisma.usuarios.delete({ where: { email: data.email} })
}

export async function findFuncionarioPerEmail(data: Partial<createFuncionario>) {
  return await prisma.usuarios.findUnique({ where: { email: data.email } });
}

export async function findFuncionarioPerId(id: number) {
  return await prisma.usuarios.findUnique({ where: { id: id } });
}