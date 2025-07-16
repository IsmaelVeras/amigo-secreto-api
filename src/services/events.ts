import { PrismaClient, Prisma } from "../generated/prisma"

const prisma = new PrismaClient();

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

// Type que busca os campos necessários no Prisma para o CREATE 
type EventCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']

// Função Cadastrar Eventos
export const addEvent = async (data: EventCreateData) => {
  try {
    return await prisma.event.create({ data })
  } catch (error) {
    return false
  }
}