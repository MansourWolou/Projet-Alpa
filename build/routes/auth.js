"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase = __importStar(require("firebase"));
//import {CanvasTextAlign} from '../../node_modules/typescript/lib';
let router = express_1.default.Router();
let app = express_1.default();
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
function logAuth(req, res) {
    var _a, _b;
    console.log(req.body);
    const txtEmail = req.body.userName;
    const txtPassword = req.body.password;
    const txtUsername = req.body.email;
    console.log("ça commence2");
    const btnLogin = document.getElementById("btnLogin");
    console.log("ça commence3");
    const btnSignup = document.getElementById("btnSignup");
    // login event
    (_a = btnLogin) === null || _a === void 0 ? void 0 : _a.addEventListener('click', e => {
        var _a, _b, _c;
        // get email , userName and password
        const email = (_a = txtEmail) === null || _a === void 0 ? void 0 : _a.nodeValue;
        const pass = (_b = txtPassword) === null || _b === void 0 ? void 0 : _b.nodeValue;
        const userName = (_c = txtUsername) === null || _c === void 0 ? void 0 : _c.nodeValue;
        const auth = firebase.auth();
        // sign in 
        if ((typeof email === "string") && (typeof pass === "string")) {
            const Promise = auth.signInWithEmailAndPassword(email, pass);
            Promise.catch(e => console.log(e.message));
        }
        console.log("tu es connecté petit");
    });
    // add signup event
    (_b = btnSignup) === null || _b === void 0 ? void 0 : _b.addEventListener('click', e => {
        var _a, _b, _c;
        // get email , userName and password
        const email = (_a = txtEmail) === null || _a === void 0 ? void 0 : _a.nodeValue; //todo: check for real email
        const pass = (_b = txtPassword) === null || _b === void 0 ? void 0 : _b.nodeValue;
        const userName = (_c = txtUsername) === null || _c === void 0 ? void 0 : _c.nodeValue;
        const auth = firebase.auth();
        // create user
        if ((typeof email === "string") && (typeof pass === "string")) {
            const Promise = auth.createUserWithEmailAndPassword(email, pass);
            Promise.catch(e => console.log(e.message));
        }
        console.log("compte créer petit");
    });
    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        }
        else {
            console.log('not logged in');
        }
    });
    console.log("wesh tonton");
    console.log(req.body);
    res.redirect("/user");
}
exports.logAuth = logAuth;
;
