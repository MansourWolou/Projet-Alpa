import express from "express";
import * as firebase from  "firebase" ;
import { signIn } from "./signIn";


export function logAuth (req: express.Request, res: express.Response)  {
   

  // add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    }else{
      console.log('not logged in');
    }
  })
  console.log("auth");
  
  res.redirect("/user");
  
 };



  
  
  