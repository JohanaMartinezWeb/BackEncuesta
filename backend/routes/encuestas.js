import express from "express";
import { check } from "express-validator";
import { validarCampos, IdCadena } from "../middlewares/validators.js";

import {
	deleteEncuestas,
	getEncuesta,
	postEncuesta,
	putEncuesta,
	saveVoto,
	todasLasEncuestas,
} from "../controllers/encuestaC.js";

const router = express.Router();

router.post(
	"/",
	[
		check("id").custom(IdCadena),
		check("pregunta", "La pregunta debe tener al menos cuatro letras").isLength(
			{ min: 4 }
		),
		check("pregunta", "La pregunta no puede estar vacía").notEmpty(),
		validarCampos,
	],
	postEncuesta
);
router.get("/", todasLasEncuestas);
router.put(
	"/:id",
	[
		check("pregunta", "La pregunta debe tener al menos cuatro letras").isLength(
			{ min: 4 }
		),
		check("pregunta", "La pregunta no puede estar vacía").notEmpty(),
		validarCampos,
	],
	putEncuesta
);
router.post(
	"/votar",
	[
		check("ip", "La pregunta debe tener al menos cuatro letras").isLength({
			min: 10,
		}),
		validarCampos,
	],
	saveVoto
);
router.get("/:id", getEncuesta);
router.delete("/:id", deleteEncuestas);

export default router;
