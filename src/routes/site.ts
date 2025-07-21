import { Router } from "express";
import * as events from "../controllers/events";
import * as people from "../controllers/people";

const router = Router();

// route to ping the server
router.get("/ping", (req, res) => {
  res.json ({pong: true });
});

router.get('/events/:id', events.getEventById)
router.get('/events/:id_event/search', people.searchPerson)
 

export default router;
