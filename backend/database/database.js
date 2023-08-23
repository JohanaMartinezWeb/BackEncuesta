import mongoose from 'mongoose';

export async function dbConnection() {
    try {
        const conexion = await mongoose.connect(process.env.URI_MONGO);
        console.log("Conectado a DB");
    } catch (err) {
        console.log(err);
    }
}