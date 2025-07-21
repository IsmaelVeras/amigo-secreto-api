import { PrismaClient, Prisma } from "../generated/prisma"
import * as people from "./people"
import * as groups from "./groups"
import { encryptMatch } from "../utils/match";

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

export const doMatches = async (id: number): Promise<boolean> => {
  const eventItems = await prisma.event.findFirst({ where: {id}, select: { grouped: true } })
  if(eventItems){
    const peopleList =  await people.getAll({id_event: id })
    if(peopleList ) {
      let sortedList : { id: number, match: number}[] = []
      let sortable: number[] = []

      let attempts = 0;
      let maxAttempts =  peopleList.length; 
      let keepTrying = true

      while(keepTrying && attempts < maxAttempts ) {
         keepTrying = false
         attempts++; 
          sortedList = []
          sortable = peopleList.map(item => item.id)

          for (let i in peopleList) {
             let sortableFiltered: number[] = sortable;
             if(eventItems.grouped) {
              sortableFiltered = sortableFiltered.filter(sortableItem => {
                let sortablePerson = peopleList.find(item => item.id  === sortableItem)
                return peopleList[i].id_group !== sortablePerson?.id_group
              }) 
             }

             if (sortableFiltered.length === 0 || (sortableFiltered .length === 1 && peopleList[i].id === sortableFiltered[0])) {
                keepTrying = true
            } else {
               let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
               
               while (sortableFiltered[sortedIndex] === peopleList[i].id) {
                  sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
               } 

               sortedList.push({
                  id: peopleList[i].id,
                  match: sortableFiltered[sortedIndex]
               });
                sortable = sortable.filter(item => item !==  sortableFiltered[sortedIndex]); 
            }
          }
      }

      if(attempts < maxAttempts) {
         for (let i in sortedList) {
           await people.update({
               id: sortedList[i].id,
               id_event: id 
           }, { matched: encryptMatch(sortedList[i].match) }) 
         }
         return true
      }
    }
  }
  return false; 
}