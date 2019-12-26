import express from "express";
import * as firebase from  "firebase" ;

let router = express.Router();

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

router.get("/log", (req: express.Request, res: express.Response) => {

const txtEmail     = document.getElementById("txtEmail");
const txtPassword  = document.getElementById("txtPassword");
const txtUsername  = document.getElementById("txtUsername");
const btnLogin     = document.getElementById("btnLogin");
const btnSignup    = document.getElementById("btnSignup");

// login event

btnLogin?.addEventListener('click',e => {
  // get email , userName and password
  let email:string;
   email =  txtEmail?.nodeValue;
  const pass  =  txtPassword?.nodeValue;
  const userName= txtUsername?.nodeValue;
  const auth  = firebase.auth();
  // sign in 
  auth.signInWithEmailAndPassword(email,pass);
  Promise.catch(e => console.log(e.message));
})

  res.render("log");
});

export { router as logRoute };
