import express from "express";
import cors from "cors";
import { dbConnection } from "../database/database.js";
import encuestaRoute from "../routes/encuestas.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/v1/encuestas";
    this.middlewares();
    this.routes();
    this.conectarDB();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use((__, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-type,Accept"
      );
      next();
    });
  }

  routes() {
    this.app.use(this.usuariosPath, encuestaRoute); 
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
