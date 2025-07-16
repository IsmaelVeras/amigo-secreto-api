import { Router } from "express";
import * as auth from "../controllers/auth"
import * as events from "../controllers/events"

const router = Router();

// rota para acessar tela de login 
router.post('/login', auth.login)

// rota de ping para teste
router.get('/ping', auth.validate, (req, res) => res.json ({pong: true, admin: true }))

// rota que busca todos os eventos
router.get('/events', auth.validate, events.getALl)

// rota que busca eventos por id 
router.get('/events/:id', auth.validate, events.getEventById)

// rota que cadastra eventos 
router.post('/events', auth.validate, events.createEvent)


export default router;
 