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
type GetOneFilters = { id: number; id_event?: number;}
export const getOne =  async (filters: GetOneFilters) => {
  try {
    return await prisma.eventPeople.findUnique({
      where: filters
    })
  } catch(err) {
    return false;
  }
} 