import type { RequestHandler } from "express";
import { Prisma } from "../generated/prisma";
import * as people from '../services/people'

// get all people from a group
export const getAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;
  
  const items = await people.getAll({
     id_event: parseInt(id_event),
     id_group: parseInt(id_group)
  }) 
  if (items) return res.json({people: items})

  res.json({error: 'Ocorreu um erro'})
}

// search person by id
export const getPersonById: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
  const peopleItem = await people.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event)
  }
  );
  if (peopleItem) return res.json({event: peopleItem})

  res.json({error: 'Ocorreu um erro'})
}
