import Problem from "../models/Problem.js";

export const getProblemList = async(req, res) => {
    try {
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