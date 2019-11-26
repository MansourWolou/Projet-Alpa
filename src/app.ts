import express from "express";
import bodyParser from "body-parser";
import path from "path";

const PORT: number = 8080;
const PUBLIC_DIR = "../public";
const app = express();

import { indexRoute } from "./routes/index";
import { userRoute } from "./routes/users";

class HttpServer {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  public onStart(): void {
    let app: express.Application = express();

    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "pug");

    // app.use(logger('dev'))  je sais pas a quoi ça sert
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(PUBLIC_DIR));

    app.listen(this.port, () => {
      console.log(
        "Application lancée à l'adresse http://localhost:" + this.port
      );
    });

    app.get("/", indexRoute);
    app.get("/user", userRoute);
  }
}

let server: HttpServer = new HttpServer(PORT);
server.onStart();
