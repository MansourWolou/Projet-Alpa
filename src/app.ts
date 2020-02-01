import express from "express";
import bodyParser from "body-parser";
import path from "path";
import * as firebase from  "firebase" ;
import * as firebaseui from "firebaseui";  

import { indexRoute } from "./routes/index";
import { userRoute } from "./routes/users";
import { logRoute  } from "./routes/log";
import { logAuth   } from  "./routes/auth";
import { signIn } from "./routes/signIn";
import { signUp } from "./routes/signup";

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
    
var firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    let app: express.Application = express();

    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "pug");

    // app.use(logger('dev'))  je sais pas a quoi ça sert
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '../Public/'));

    app.listen(this.port, () => {
      console.log(
        "Application lancée à l'adresse http://localhost:" +
          this.port 
          
      );
    });

    app.get("/", indexRoute);
    app.get("/user", userRoute);
    app.get("/log",logRoute);
    //app.post("/log/auth",logAuth);
    app.post("/log/signIn",signIn);
    app.post("/log/signUp",signUp);
  }
}

let server: HttpServer = new HttpServer(PORT);
server.onStart();
