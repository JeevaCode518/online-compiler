import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/router.js';
import auth from './routes/auth.js';
import DBConnection from './database/database.js';
import api from  './routes/api.js'
import cookieParser from "cookie-parser";

dotenv.config();

DBConnection();

const app = express();
    
app.use(cors({
  origin: "https://online-compiler-murex.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);
app.use("/auth", auth);
app.use("/api", api);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () =>{
    console.log(`Server Running On the PORT ${PORT}`);
});