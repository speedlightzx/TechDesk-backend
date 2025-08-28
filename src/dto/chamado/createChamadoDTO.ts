import { SeveridadeChamado, StatusChamado } from "@prisma/client"
import z from 'zod'

export const createChamadoDTO = z.object({
    titulo: z.string({ required_error: "Insira o título do chamado.", invalid_type_error: "Insira um título válido." }).min(1),
    descricao: z.string({ required_error: "Insira a descrição do chamado.", invalid_type_error: "Insira uma descrição válida."}).min(1),
    severidade: z.enum(['Baixo', 'Médio', 'Alto', 'Crítico'], {
        required_error: 'Insira um nível de severidade do chamado.',
        invalid_type_error: 'Nível de severidade inválido.'
    })
}).strict("Dados inválidados.")


export interface createChamado {
    titulo: string
    descricao: string
    severidade: SeveridadeChamado
    status: StatusChamado
}