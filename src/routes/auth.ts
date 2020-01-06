import express from "express";
import * as firebase from  "firebase" ;
//import {CanvasTextAlign} from '../../node_modules/typescript/lib';

let router = express.Router();
let app    : express.Application = express();


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

export function logAuth (req: express.Request, res: express.Response)  {
  
  
    console.log(req.body);
    const txtEmail     = req.body.userName;
    const txtPassword  = req.body.password;
    const txtUsername  = req.body.email;
    console.log("ça commence2");
    const btnLogin = req.body.btnLogin;
    console.log("ça commence3");
    const btnSignup    = document.getElementById("btnSignup");
    
    // login event
  
  btnLogin?.addEventListener('click',e => {
    // get email , userName and password
    const email    = txtEmail?.nodeValue;
    const pass     = txtPassword?.nodeValue;
    const userName = txtUsername?.nodeValue;
    const auth     = firebase.auth();
    // sign in 
    if ((typeof email  === "string")&&(typeof pass === "string")) {
      const Promise = auth.signInWithEmailAndPassword(email,pass)
      Promise.catch(e => console.log(e.message));
    }
    console.log("tu es connecté petit");
  })
  // add signup event
  btnSignup?.addEventListener('click',e =>{
  // get email , userName and password
  const email    = txtEmail?.nodeValue;//todo: check for real email
  const pass     = txtPassword?.nodeValue;
  const userName = txtUsername?.nodeValue;
  const auth     = firebase.auth();
  // create user
  if ((typeof email  === "string")&&(typeof pass === "string")) {
    const Promise = auth.createUserWithEmailAndPassword(email,pass)
    Promise.catch(e => console.log(e.message));
  }
  
  console.log("compte créer petit");

  })
  
  // add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    }else{
      console.log('not logged in');
    }
  })
  console.log("wesh tonton");
    
   
  
  console.log(req.body)
  res.redirect("/user");
  
 };



  
  
  