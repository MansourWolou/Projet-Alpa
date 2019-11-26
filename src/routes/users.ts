import express from "express";

let router = express.Router();

router.get("/user", (req: express.Request, res: express.Response) => {
  res.render("user");
});

export { router as userRoute };
