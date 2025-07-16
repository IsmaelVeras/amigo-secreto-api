import { Router } from "express";
import * as auth from "../controllers/auth"
import * as events from "../controllers/events"

const router = Router();

// rota para acessar tela de login 
router.post('/login', auth.login)
  
router.get('/ping', auth.validate, (req, res) => res.json ({pong: true, admin: true }))

router.get('/events', auth.validate, events.getALl)
router.get('/events/:id', auth.validate, events.getEventById)
export default router;
 