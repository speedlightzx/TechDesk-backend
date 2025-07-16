import { createFuncionarioResponseDTO } from "../dto/user/createFuncionarioResponseDTO";
import {
  createFuncionario,
  createFuncionarioDTO,
} from "../dto/user/createFuncionarioDTO";
import {
  createFuncionarioRepository,
  findFuncionarioPerEmail,
  findFuncionarioPerId,
} from "../repositories/userRepository";
import { HttpError } from "../utils/HttpError";
import * as jwt from "jsonwebtoken";

const secret: any = process.env.JWT_SECRET;

export default async function createFuncionarioServices(
  data: createFuncionario,
  token: string
) {
  const userInfo = jwt.decode(token, secret);
  if (userInfo && typeof userInfo === "object" && "id" in userInfo) {
    const admin = await findFuncionarioPerId(userInfo.id as number);

    if (admin?.cargo != "Administrador")
      throw new HttpError(
        "Você não tem permissão para realizar essa ação.",
        401
      );
  } else {
    throw new HttpError("Problema na autenticação.", 500);
  }

  const validate = createFuncionarioDTO.safeParse(data);

  if (!validate.success) {
    const error = validate.error.issues[0].message;
    throw new HttpError(error, 400);
  }

  const funcionario = await findFuncionarioPerEmail(data);
  if (funcionario)
    throw new HttpError(
      "Já existe um funcionário cadastrado com esse email.",
      409
    );

  const createFuncionario = await createFuncionarioRepository(data);

  return createFuncionarioResponseDTO(createFuncionario);
}
