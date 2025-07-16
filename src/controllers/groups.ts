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
 