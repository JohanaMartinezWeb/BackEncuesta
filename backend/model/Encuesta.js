import mongoose from "mongoose";

const encuestaSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  pregunta: {
    type: String,
    required: true,
  },
  opciones: [
    {
      id: { type: String, unique: true },
      opcion: String,
      votos: { type: Number, default: 0 },
    },
  ],
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("encuestas", encuestaSchema);
