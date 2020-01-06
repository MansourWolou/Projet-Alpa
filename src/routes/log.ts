import express from "express";
let router = express.Router();


var pageLoge = router.get("/log", (req: express.Request, res: express.Response) => {
  res.render("lg");
});

export {  pageLoge as logRoute };

