import type { RequestHandler } from "express";
import * as events from "../services/events"
import { parse } from "path";


export const getALl: RequestHandler = async (req, res) => {
  const items = await events.getALl();
  if (items) return res.json({events: items})
  
  res.json({error: 'Ocorreu um erro'})
}

// Function to get a single event by ID  
export const getEventById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const eventItem = await events.getOne(parseInt(id) );
  if (eventItem) return res.json({event: eventItem})

  res.json({error: 'Ocorreu um erro'})
}