import mongoose from "mongoose";

const restriccionSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  encuestaId: {
    type: String,
    required: true,
  },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("restricciones", restriccionSchema);
