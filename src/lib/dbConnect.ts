import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
    // ?matlab hogi yaa nahi hogi
}

const connection: ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("ALready connected to database");
        return
        
    }
    try{
        const db= await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected= db.connections[0].readyState

        console.log("DB Connected successfully");
        
    }
    catch(error){
        console.log("Database connection failes!",error);
        // Database is not connected than we exit 
        process.exit(1)
    }
}

export default dbConnect;





