import express from 'express';
import { compiler, runHiddenTests } from '../controller/apiController.js';

const router = express.Router();

router.post("/run", compiler);
router.post("/submit", runHiddenTests);

export default router;