import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    summary: {
        total: Number,
        passed: Number,
        failed: Number,
        failedAt: Number, // null if all passed
        status: { type: String } // "Accepted" or "Wrong Answer"
    },
    createdAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;