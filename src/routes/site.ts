import { Router } from "express";

const router = Router();

// route to ping the server
router.get("/ping", (req, res) => {
  res.json ({pong: true });
});

export default router;
