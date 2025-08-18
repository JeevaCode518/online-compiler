import express, { response, Router } from 'express';

import { addProblems, getHiddenTestCases } from '../controller/problemController.js';
import { getProblemList } from '../controller/problemController.js';
import { getProblemById } from '../controller/problemController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getAiReview } from '../controller/aiReviewController.js';
const router = express.Router();

// router.post("/run", compiler);
// router.post("/run", compiler);


router.post("/addProblems", verifyToken, addProblems);
// router.get("/problems", getProblemList);
router.get("/problems", verifyToken, getProblemList);
router.get("/problems/:id", verifyToken, getProblemById);
router.get("/problems/:id/hidden", getHiddenTestCases);
router.post("/ai-review", getAiReview);
export default router;
