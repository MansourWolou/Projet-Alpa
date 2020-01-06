"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
const log_1 = require("./routes/log");
const auth_1 = require("./routes/auth");
//import { signInRoute } from "./routes/log";
require('dotenv').config();
const PORT = 8080; //TODO : mettre ça dans le .env
const PUBLIC_DIR = "../public";
const app = express_1.default();
class HttpServer {
    constructor(port) {
        this.port = port;
    }
    onStart() {
        let app = express_1.default();
        app.set("views", path_1.default.join(__dirname, "../views"));
        app.set("view engine", "pug");
        // app.use(logger('dev'))  je sais pas a quoi ça sert
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.static(__dirname + '../Public/'));
        app.listen(this.port, () => {
            console.log("Application lancée à l'adresse http://localhost:" +
                this.port);
        });
        app.get("/", index_1.indexRoute);
        app.get("/user", users_1.userRoute);
        app.get("/log", log_1.logRoute);
        app.post("/log/auth", auth_1.logAuth);
    }
}
let server = new HttpServer(PORT);
server.onStart();
