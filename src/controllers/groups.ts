import { RequestHandler } from "express";
import * as groups from '../services/groups';

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
    id_event: parseInt(id_event )
  }
  );
  if (groupItem) return res.json({event: groupItem})

  res.json({error: 'Ocorreu um erro'})
}