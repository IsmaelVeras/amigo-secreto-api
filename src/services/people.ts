import { PrismaClient, type Prisma } from "../generated/prisma";
import * as groups from '../services/groups';


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

// create a person
type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data'];

export const add = async (data: PeopleCreateData) => {
  try {
    if (!data.id_group) return false;
    
    const group = await groups.getOne({
      id: data.id_group,
      id_event: data.id_event
    });
    if (!group) return false;

    return await prisma.eventPeople.create({ data });
  } catch (err) {
    return false;
  }
}

// update person 
type PeopleUpdateData = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']
type UpdateFilters = {id?: number; id_event: number; id_group?: number;}

export const update = async (filters: UpdateFilters, data: PeopleUpdateData) => { 
  try {
    return await prisma.eventPeople.updateMany({
      where: filters,
      data 
    });
  } catch (err) {
    return false;
  }
}

// delete person
type DeleteFilters = {id: number; id_event?: number, id_group?: number;}

export const removePerson = async (filters: DeleteFilters) => {
  try {
    return await prisma.eventPeople.delete({
      where: filters
    });
  } catch (err) {
    return false;
  }
}