import { PrismaClient } from "@prisma/client";
import { auth } from "../dto/authDTO";
const prisma = new PrismaClient();

export async function validateLogin(data: auth) {
  return await prisma.usuarios.findUnique({
    where: {
      email: data.email,
      senha: data.senha,
    },
  });
}
