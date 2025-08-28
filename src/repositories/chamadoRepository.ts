import { PrismaClient } from "@prisma/client";
import { createChamado } from "../dto/chamado/createChamadoDTO";
const prisma = new PrismaClient();

export async function createChamadoRepository(data: createChamado, idEmpresa: number, idUsuario: number) {
    return await prisma.chamados.create({
        data: {
            titulo: data.titulo,
            descricao: data.descricao,
            severidade: data.severidade,
            empresaId: idEmpresa,
            usuarioId: idUsuario
        },
        select: {
            titulo: true,
            descricao: true,
            severidade: true,
            status: true,
            data: true
        }
    })
}

export async function getMyChamadosRepository(id: number) {
    return await prisma.chamados.findMany({
        where: { usuarioId: id },
        select: {
            titulo: true,
            descricao: true,
            severidade: true,
            status: true,
            data: true
        }
    })
}