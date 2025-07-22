import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBConnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("DB Connection established");
    }catch(error){
        console.log("Error while connction to MongoDb" + error);
    }
};

export default DBConnection;