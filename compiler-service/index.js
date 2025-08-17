import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/api.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://online-compiler-murex.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use("/api", api);

const PORT = process.env.PORT || 8000;
console.log(PORT);
app.listen(PORT, () =>{
    console.log(`Server Running oo the PORT ${PORT}`);
});