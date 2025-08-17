import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({  
  title: String,
  problemNum: {
    type: Number,
    unique: true
  },
  description: String,
  difficulty: String,
  tags: [String],
  constraints: String,
  sampleInput: String,
  sampleOutput: String,
  hiddenTestCases: [
    { input: String, output: String }
  ],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

problemSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastProblem = await this.constructor.findOne().sort("-problemNum");
    this.problemNum = lastProblem ? lastProblem.problemNum + 1 : 1;
  }
  next();
});

const Problem = mongoose.model("problem", problemSchema);
export default Problem;