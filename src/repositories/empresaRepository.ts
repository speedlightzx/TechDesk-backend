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

export async function getEmpresaStatusRepository(idEmpresa:number) {
  const dateNow = new Date()
  const latestsChamadosTime = new Date(dateNow.getTime() - 24 * 60 * 60 * 1000)

  const pendantsChamadosCount = prisma.chamados.count({
    where: {
      empresaId: idEmpresa,
      status: "Pendente"
    }
  })

  const chamadosCriticosCount = prisma.chamados.count({
    where: {
      empresaId: idEmpresa,
      severidade: "Crítico"
    }
  })

  const latestsChamadosCount = prisma.chamados.count({
    where: {
      empresaId: idEmpresa,
      data: {gte: latestsChamadosTime}
    }
  })

  const tecnicosCount = prisma.usuarios.count({
    where: {
      id_empresa: idEmpresa,
      cargo: "Técnico"
    }
  })

  const [pendantsChamados, latestsChamados, tecnicos, criticsChamados] = await Promise.all([
    pendantsChamadosCount,
    latestsChamadosCount,
    tecnicosCount,
    chamadosCriticosCount
  ])

  return { pendantsChamados, latestsChamados, tecnicos, criticsChamados }
}