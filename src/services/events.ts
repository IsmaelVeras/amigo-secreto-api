import { PrismaClient } from "../generated/prisma"

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