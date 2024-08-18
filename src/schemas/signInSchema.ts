import {z} from "zod"

export const signInSchema=z.object({
    // identifier means username ya email hota hai 
    identifier:z.string(),
    password:z.string(),
})