import express, { response, Router } from 'express';
import { compiler } from '../controller/apiController.js';

const router = express.Router();

router.post("/run", compiler);

export default router;
