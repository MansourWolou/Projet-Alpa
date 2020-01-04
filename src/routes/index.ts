import express from "express";

let router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.render("page/index");
});

export { router as indexRoute };
