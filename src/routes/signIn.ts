import express from "express";
import * as firebase from  "firebase" ;



export function signIn (req: express.Request, res: express.Response)  {
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
    // sign in 
      const Promise   = auth.signInWithEmailAndPassword(Email,Pass)
      Promise.catch(e =>  console.log(e.message));
    
    console.log("tu es connecté petit");
    
  
  console.log("signin");

  res.redirect("/user");
  
 };



  
  
  