import express from "express";
import * as firebase from  "firebase" ;


export function signUp (req: express.Request, res: express.Response)  {
  
    // get email , userName and password
    //todo: add verify pass , birthdate
    let Email :string;
  let Pass :string;
  let Username : string;
      // get email , userName and password
    console.log(req.body);
    const email       = req.body.email;
    const pass        = req.body.Password;
    const username    = req.body.UserName;
    const auth        = firebase.auth();
    Email = email;
    Pass  = pass;
    Username = username;
    // create user
    const Promise = auth.createUserWithEmailAndPassword(Email,Pass)
    Promise.catch(e => console.log(e.message));
    console.log("compte créer petit");

  
  


  console.log("signUp");
    
   
  
  res.redirect("/user");
  
 }
 
 



  
  