import { Router } from "express";
import * as auth from '../controllers/auth'
import * as events from '../controllers/events'
import * as groups from '../controllers/groups'
import * as people from '../controllers/people'

const router = Router();

// route to login 
router.post('/login', auth.login)

// route to get all events
router.get('/events', auth.validate, events.getALl)

// route to get event by id
router.get('/events/:id', auth.validate, events.getEventById)

// route to create an event
router.post('/events', auth.validate, events.createEvent)

// route to update event
router.put('/events/:id', auth.validate, events.updateEvent)

// route delete event
router.delete('/events/:id', auth.validate, events.deleteEvents)

// route to get all groups from an event
router.get('/events/:id_event/groups', auth.validate, groups.getAll)

// route to get group by id
router.get('/events/:id_event/groups/:id', auth.validate, groups.getGroupById)

// route to create a group
router.post('/events/:id_event/groups', auth.validate, groups.createGroup)

// route to update group
router.put('/events/:id_event/groups/:id', auth.validate, groups.updateGroup)

// route delete group 
router.delete('/events/:id_event/groups/:id', auth.validate, groups.deleteGroup)

// route to get all people from an event
router.get('/events/:id_event/groups/:id_group/people', auth.validate, people.getAll)

// route get person by id
router.get('/events/:id_event/groups/:id_group/people/:id', auth.validate, people.getPersonById)


export default router;
 