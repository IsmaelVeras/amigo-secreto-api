import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
 
// get all people from an event
type GetAllFilters = { id_event: number; id_group?: number; }; 
export const getAll = async (filters: GetAllFilters) => {
   try {
    return await prisma.eventPeople.findMany({ where: filters })
   } catch (error){ return false; }
}