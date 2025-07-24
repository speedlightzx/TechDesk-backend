import { auth, authDTO } from "../dto/auth/authDTO";
import { validateLogin } from "../repositories/authRepository";
import { HttpError } from "../utils/HttpError";
import * as jwt from "jsonwebtoken";
import { validateDTO } from "../utils/validateDTO";

const secret = process.env.JWT_SECRET;

export async function validateLoginServices(data: auth) {
  const validate = await validateDTO(authDTO, data)
  if(validate != true) throw new HttpError(validate.error, 400)

  const findUser = await validateLogin(data);
  if (!findUser) throw new HttpError("Credenciais inválidas.", 401);

  if (!secret) throw new HttpError("Problema na autenticação.", 500);
  const token = jwt.sign({ id: findUser.id, id_empresa: findUser.id_empresa }, secret!, { expiresIn: "2h" });

  return { findUser, token };
}
