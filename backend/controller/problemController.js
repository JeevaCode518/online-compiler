import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";
 
export const getProblemList = async(req, res) => {
    try {
        console.log("REQUEST HERE");
        const problems = await Problem.find({}, "title difficulty tags problemNum");
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch problems" });
  }
}

export const addProblems = async(req, res) =>{

    try{
        const problemData = req.body;
        console.log("PROB ", problemData);
        const problem = new Problem(problemData);

        await problem.save();
        
        res.status(201).json({ message: "Problem added successfully", problem });
    }catch(error){
        res.status(500).json({ error: "Failed to add problem" });
    }
}

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHiddenTestCases = async (req, res) => {
  try {
    const { id } = req.params;

    // fetch only hiddenTestCases field
    const problem = await Problem.findById(id, "hiddenTestCases");
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ hiddenTestCases: problem.hiddenTestCases });
  } catch (error) {
    console.error("Error fetching hidden test cases:", error);
    res.status(500).json({ message: "Failed to fetch hidden test cases" });
  }
};

export const createSubmissionRecord = async (req, res) => {
  try {
    const { userId, problemId, code, language, totalTests, passedTests, failedAt } = req.body;

    if (!userId || !problemId || !code || !language || totalTests === undefined || passedTests === undefined) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Determine submission status
    let status = "Accepted";
    if (failedAt) {
      status = `Wrong Answer on test case ${failedAt}`;
    }

    // Create submission record
    const submission = new Submission({
      user: userId,
      problem: problemId,
      code,
      language,
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: totalTests - passedTests,
        failedAt: failedAt || null,
        status
      }
    });

    await submission.save();

    // Optional: increment submissions count in Problem
    // await Problem.findByIdAndUpdate(problemId, { $inc: { submissionsCount: 1 } });

    return res.status(201).json({ success: true, submission });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.toString() });
  }
};

export const getSubmissionRecord = async (req, res) => {
  const { userId, problemId } = req.query;

  try {
    const submissions = await Submission.find({ user: userId, problem: problemId })
      .sort({ createdAt: -1 }); // latest submissions first
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};