import { PrismaClient, Prisma } from "../generated/prisma"

const prisma = new PrismaClient();

// Function to get all events
export const getALl = async () => {
  try {
    return await prisma.event.findMany()
  } catch(err) { 
      return false; 
  }
}

// Function to get a single event by ID
export const getOne = async (id: number) => {
  try {
    return await prisma.event.findUnique({
      where: { id }
    })
  } catch(err) {
    return false;
  }
} 

// Type for event creation data 
type EventCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']

// Function to add a new event
export const addEvent = async (data: EventCreateData) => {
  try {
    return await prisma.event.create({ data })
  } catch (err) {
    return false
  }
}

// Type for event update data
type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data']

// Function to update an event
export const updateEvent = async (id: number, data: EventsUpdateData) => {
  try {
    return await prisma.event.update({
      where: { id },
      data
    })
  } catch (err) {
    return false
  }
}

// Function to remove an event
export const removeEvent = async (id: number) => {
  try {
    return await prisma.event.delete( {where: {id} } )
  } catch (err) {
    return false
  }
}