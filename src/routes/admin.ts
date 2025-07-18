import { Router } from "express";
import * as auth from "../controllers/auth"
import * as events from "../controllers/events"
import * as groups from "../controllers/groups"

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

// rota de atualização de eventos
router.put('/events/:id', auth.validate, events.updateEvent)

// rota de apagar eventos
router.delete('/events/:id', auth.validate, events.deleteEvents)

// rota que busca todos os grupos de um evento
router.get('/events/:id_event/groups', auth.validate, groups.getAll)

// rota que busca grupo por id
router.get('/events/:id_event/groups/:id', auth.validate, groups.getGroupById)




export default router;
 