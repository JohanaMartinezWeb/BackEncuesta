import Encuesta from "../model/Encuesta.js";
import Restriccion from "../model/Restriccion.js";
import { validationResult } from "express-validator";

export const postEncuesta = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const datos = new Encuesta({
      id: req.body.id,
      pregunta: req.body.pregunta,
      opciones: req.body.opciones,
    });

    const respuesta = await datos.save();
    res.json(respuesta);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const putEncuesta = async (req, res) => {
  try {
    const { id, pregunta, opciones } = req.body;
    const respuesta = await Encuesta.findOneAndUpdate(
      { id: id },
      { pregunta: pregunta, opciones: opciones },
      { new: true }
    );

    if (respuesta) {
      res.json(respuesta);
    } else {
      res.status(404).json({ message: "Encuesta no encontrada" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getEncuesta = async (req, res) => {
  try {
    const id = req.params.id;

    Encuesta.findOne({ id: id })
      .then((respuesta) => {
        if (respuesta) {
          res.json(respuesta);
        } else {
          res.status(404).json({ message: "Encuesta no encontrada" });
        }
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const todasLasEncuestas = async (req, res) => {
  try {
    Encuesta.find()
      .then((respuesta) => {
        if (respuesta) {
          res.json(respuesta);
        } else {
          res.status(404).json({ message: "No hay encuestas" });
        }
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEncuestas = async (req, res) => {
  try {
    const id = req.body.id;

    Encuesta.findOneAndRemove({ _id: id })
      .then((respuesta) => {
        if (respuesta) {
          res.json({
            message: "Encuesta borrada con éxito",
            deletedEncuesta: respuesta,
          });
        } else {
          res
            .status(404)
            .json({ message: "No se encontró ninguna encuesta para borrar" });
        }
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const saveVoto = async (req, res) => {
  try {
    const { encuestaId, opcionId, ip } = req.body;
    Restriccion.findOne({ ip, encuestaId })
      .then((voto) => {
        if (voto) {
          res.status(400).json({ mensaje: "Usted ya votó en esta encuesta" });
        } else {
          Encuesta.updateOne(
            { id: encuestaId, "opciones.id": opcionId },
            { $inc: { "opciones.$.votos": 1 } }
          )
            .then((respuesta) => {
              if (respuesta.modifiedCount > 0) {
                let restric = new Restriccion({
                  ip: req.body.ip,
                  encuestaId,
                });
                restric
                  .save()
                  .then((respuesta) =>
                    res.json({
                      mensaje: `Voto registrado con id:${respuesta._id}`,
                    })
                  )
                  .catch((error) => res.status(500).json(error));
              } else {
                res.status(400).json({ mensaje: "Voto NO registrado" });
              }
            })
            .catch((error) => res.status(500).json(error));
        }
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).send({ mensaje: error });
  }
};
