import express  = require('express');

let router   = express.Router();

router.get('/user',(req:express.Request , res:express.Response )=>{
  res.render('index');
});

export {router as userRoute};