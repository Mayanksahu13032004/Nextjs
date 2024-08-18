import {z} from "zod"

export const acceptMessageSchema=z.object({
    // identifier means username ya email hota hai 
    acceptMessage:z.boolean(),
    
})