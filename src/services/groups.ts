import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();


// get all event
export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: {id_event }});
  } catch (error) { return false }
}

// get group by id

type GetOneFilters = { id: number; id_event?: number;}
export const getOne =  async (filters: GetOneFilters) => {
  try {
    return await prisma.eventGroup.findUnique({
      where: filters
    })
  } catch(err) {
    return false;
  }
} 