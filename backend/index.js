import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/router.js';
import auth from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());

app.use("/", router);
app.use("/auth", auth);

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`Server Running oo the PORT ${PORT}`);
});