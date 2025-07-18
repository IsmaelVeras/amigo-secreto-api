import { PrismaClient, Prisma } from "../generated/prisma";
import * as events from "./events";

const prisma = new PrismaClient();

// get all event
export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: {id_event }});
  } catch (err) { return false }
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

// create group
type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data']

export const create = async (data: GroupsCreateData) => {
  try {
    if (!data.id_event) return false;
    const eventItem = await events.getOne(data.id_event);
    if (!eventItem) return false;

    return await prisma.eventGroup.create({ data });
  } catch (err)  {
    return false;
  }
}

// update group
type UpdateFilters = {id: number; id_event?: number;}
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, 'update'>['data']

export const update = async (filters: UpdateFilters, data: GroupsUpdateData) => { 
  try {
    return await prisma.eventGroup.update({
      where: filters,
      data 
    });
  } catch (err) {
    return false;
  }
} 

// delete group
type DeleteFilters = {id: number; id_event?: number;}

export const removeGroup = async (filters: DeleteFilters) => {
  try {
    return await prisma.eventGroup.delete({
      where: filters
    });
  } catch (err) {
    return false;
  }
}