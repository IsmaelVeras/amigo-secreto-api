import { RequestHandler } from "express";
import * as groups from '../services/groups';
import z from "zod";

// Controller to get all groups for a specific event
export const getAll: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const items = await groups.getAll(parseInt(id_event));
  if ( items) {
    return res.json({ groups: items });
  }
  return res.json({ error: "Ocorreu um erro"  });
};
 
// Controller to get group specific by id
export const getGroupById: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
  const groupItem = await groups.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event)
  }
  );
  if (groupItem) return res.json({event: groupItem})

  res.json({error: 'Ocorreu um erro'})
}

// Controller to create a new group
export const createGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const addGroupShema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
  });

  const body = addGroupShema.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: 'Dados inválidos'});

  const newGroup = await groups.create({
    name: body.data.name,
    id_event: parseInt(id_event)
  });
  if (newGroup) return res.status(201) .json({ group: newGroup });

  res.json({ error: 'Ocorreu um erro ao criar o grupo' });
};

// Controller to update a group
export const updateGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
 
  const updateGroupSchema = z.object({
    name: z.string().optional(),
  });

  const body = updateGroupSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });

  const updatedGroup = await groups.update(
    { id: parseInt(id), id_event: parseInt(id_event) },
    body.data
  ); 
  if (updatedGroup) return res.json({ group: updatedGroup });

  res.json({ error: 'Ocorreu um erro ao atualizar o grupo' });
}

// Controller to delete a group
export const deleteGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const deleted = await groups.removeGroup({
    id: parseInt(id),
    id_event: parseInt(id_event)
  });

  if (deleted) return res.json({ group: 'Grupo deletado com sucesso' });

  res.json({ error: 'Ocorreu um erro ao deletar o grupo' });
}