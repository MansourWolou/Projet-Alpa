import express from "express";
import bodyParser from "body-parser";
import path from "path";
import * as firebase from  "firebase" ;
import * as firebaseui from "firebaseui";  

import { indexRoute } from "./routes/index";
import { userRoute } from "./routes/users";
import { logRoute  } from "./routes/log";



require('dotenv').config();




const PORT: number = 8080; //TODO : mettre ça dans le .env
const PUBLIC_DIR = "../public";
const app = express();


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
        "Application lancée à l'adresse http://localhost:" +
          this.port 
          
      );
    });

    app.get("/", indexRoute);
    app.get("/user", userRoute);
    app.get("/log",logRoute);
  }
}

let server: HttpServer = new HttpServer(PORT);
server.onStart();
