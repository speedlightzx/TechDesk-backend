import { PrismaClient } from "@prisma/client";
import { empresa } from "../dto/empresa/empresaDTO";
const prisma = new PrismaClient();

export async function findEmpresa(data: empresa) {
  return await prisma.empresas.findUnique({
    where: {
      cnpj: data.cnpj,
    },
  });
}

export async function findEmailFundador(data: empresa) {
  return await prisma.usuarios.findUnique({ where: { email: data.email } });
}

export async function registerEmpresaRepository(data: empresa) {
  const result = await prisma.$transaction(async (operacao: any) => {
    const empresa = await operacao.empresas.create({
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
      },
    });

    await operacao.usuarios.create({
      data: {
        nome: data.email.split("@")[0],
        email: data.email,
        senha: data.senha,
        id_empresa: empresa.id,
        empresa_fundadorId: empresa.id,
        cargo: "CEO",
      },
    });
  });

  return result;
}
