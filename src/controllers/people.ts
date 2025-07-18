import type { RequestHandler } from "express";
import * as people from '../services/people'
import z from "zod";

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
  const { id, id_event, id_group } = req.params;
  const personItem = await people.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  }
  );
  if (personItem) return res.json({person: personItem})

  res.json({error: 'Ocorreu um erro '})
}

// create a person
export const createPerson: RequestHandler = async (req, res) => {
   const { id_event, id_group } = req.params;
    
   const addPersonSchema = z.object({
     name: z.string() ,
     cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
   });

   const body = addPersonSchema.safeParse(req.body);
    if (!body.success) return res.json({error: 'Dados inválidos'});

    const newPerson = await people.add({
      name: body.data.name,
      cpf: body.data.cpf,
      id_event: parseInt(id_event),
      id_group: parseInt(id_group)
    });

    if(newPerson) return res.status(201).json({ person: newPerson })
    
    res.json({error: 'Ocorreu um erro '})
}

// update a person
export const updatePerson: RequestHandler = async (req, res) => {
  const { id, id_event, id_group } = req.params;
 
  const updatePersonSchema = z.object({
    name: z.string().optional(),
    cpf: z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
    matched: z.string().optional(),
  });

  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });

  const updatedPerson = await people.update({ 
    id: parseInt(id), 
    id_event: parseInt(id_event), 
    id_group: parseInt(id_group) }, body.data 
);
    
  if (updatedPerson) {
    const personItem  = await people.getOne({
      id: parseInt(id), 
      id_event: parseInt(id_event) 
    });
    return res.json({ person: personItem })
  }

  res.json({ error: 'Ocorreu um erro ao atu alizar' });
}