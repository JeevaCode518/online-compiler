import express, { response, Router } from 'express';

import { addProblems, createSubmissionRecord, getHiddenTestCases, getSubmissionRecord } from '../controller/problemController.js';
import { getProblemList } from '../controller/problemController.js';
import { getProblemById } from '../controller/problemController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getAiReview } from '../controller/aiReviewController.js';
const router = express.Router();

// router.post("/run", compiler);
// router.post("/run", compiler);


router.post("/addProblems", addProblems);
router.get("/problems", getProblemList);
router.get("/problems/:id/hidden", getHiddenTestCases);
router.get("/problems/:id", getProblemById);
router.post("/ai-review", getAiReview);
router.post("/submissions", createSubmissionRecord);
router.get("/getSubmissions", getSubmissionRecord);

export default router;
