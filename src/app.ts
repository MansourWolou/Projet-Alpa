import express from "express";
import bodyParser from "body-parser";
import path from "path";
import * as firebase from  "firebase" ;
import * as firebaseui from "firebaseui"; 


require("dotenv").config();

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = process.env;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};


ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});


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
        "Application lancée à l'adresse http://localhost:" +
          this.port +
          " " +
          process.env.cle +
          "  " +
          process.env.email
      );
    });

    app.get("/", indexRoute);
    app.get("/user", userRoute);
  }
}

let server: HttpServer = new HttpServer(PORT);
server.onStart();
