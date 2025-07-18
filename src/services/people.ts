import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
 
// get all people from an event
type GetAllFilters = { id_event: number; id_group?: number; }; 
export const getAll = async (filters: GetAllFilters) => {
   try {
    return await prisma.eventPeople.findMany({ where: filters })
   } catch (error){ return false; }
}

// get person by id
type GetOneFilters = { id_event: number; id_group?: number;  id?: number, cpf?: string; }
export const getOne =  async (filters: GetOneFilters) => {
  try {
    if (!filters.id && !filters.cpf) return false;
    return await prisma.eventPeople.findFirst({
      where: filters
    })
  } catch(err) { 
    return false;
  }
} 