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

var pageLog = router.post("/log", (req: express.Request, res: express.Response) => {

    
const txtEmail     = document.getElementById("txtEmail");
const txtPassword  = document.getElementById("txtPassword");
const txtUsername  = document.getElementById("txtUsername");
const btnLogin     = document.getElementById("btnLogin");
const btnSignup    = document.getElementById("btnSignup");

// login event

btnLogin?.addEventListener('click',e => {
  // get email , userName and password
  const email =  txtEmail?.nodeValue;
  const pass  =  txtPassword?.nodeValue;
  const userName= txtUsername?.nodeValue;
  const auth  = firebase.auth();
  // sign in 
  if ((typeof email  === "string")&&(typeof pass === "string")) {
    const Promise = auth.signInWithEmailAndPassword(email,pass)
    Promise.catch(e => console.log(e.message));
  }
  
})
// add signup event
btnSignup?.addEventListener('click',e =>{
// get email , userName and password
const email =  txtEmail?.nodeValue;//todo:check for real email
const pass  =  txtPassword?.nodeValue;
const userName= txtUsername?.nodeValue;
const auth  = firebase.auth();
// sign in 
if ((typeof email  === "string")&&(typeof pass === "string")) {
  const Promise = auth.createUserWithEmailAndPassword(email,pass)
  Promise.catch(e => console.log(e.message));
}

})

// add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
  }else{
    console.log('not logged in');
  }
})

  res.render("log");
});

//var signIn  = router.post("/log/signIn", (req: express.Request, res: express.Response) => {res.render("log");})



export { pageLog as logRoute };
//export { signIn as signInRoute  };