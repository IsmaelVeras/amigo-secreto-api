import type { RequestHandler } from "express";
import * as events from "../services/events"
import * as people from '../services/people'
import z from "zod";

// Controller search all events
export const getALl: RequestHandler = async (req, res) => {
  const items = await events.getALl();
  if (items) return res.json({events: items})
  
  res.json({error: 'Ocorreu um erro'})
}

// Controller search event by id
export const getEventById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const eventItem = await events.getOne(parseInt(id) );
  if (eventItem) return res.json({event: eventItem})

  res.json({error: 'Ocorreu um erro'})
}

// Controller that creates an event
export const createEvent: RequestHandler = async(req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean()
  })  

  const body = addEventSchema.safeParse(req.body)
  if(!body.success) return res.json({error: 'Dados inválidos'})

  const newEvent = await events.addEvent(body.data);
  if(newEvent) return res.status(201).json({ event: newEvent })

  res.json({error: 'Ocorreu erro ao cadastrar'})
}

// Controller to update an event
export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  })

  const body = updateEventSchema.safeParse(req.body)
  if(!body.success) return res.json({error: 'Dados inválidos'})

  const updateEvent = await events.updateEvent(parseInt(id), body.data);
  if(updateEvent){
    if(updateEvent.status) {
      const result = await events.doMatches(parseInt(id));
      if(!result) {
        return res.json({error: 'Grupos impossíveis de serem formados '}) 
      }
    } else {
      await people.update({ id_event: parseInt(id) }, { matched: ''} );
    }
    return res.json({ event: updateEvent })
  }
  res.json({error: 'Ocorreu erro ao atualizar'})
}

// Controller to delete an event
export const deleteEvents: RequestHandler = async (req, res) => {
  const  { id } = req.params;
  
  const deletedId = await events.removeEvent(parseInt(id));
  if(deletedId) return res.json({ event: deletedId}) 
  
    res.json({error: 'Ocorreu erro ao deletar'})
} 