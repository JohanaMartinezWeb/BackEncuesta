import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(405).json({ errores: errors.array() });
  }
  next();
};

const IdCadena = (value) => {
  if (typeof value !== "string") {
    throw new Error("El IDd debe ser una cadena");
  }
  return true;
};

export { validarCampos, IdCadena };
