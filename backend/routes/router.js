import express, { request, response } from 'express';

const router = express.Router();

router.get("/", (request, response) =>{
    response.send("Welcome Home!!");
});


export default router;