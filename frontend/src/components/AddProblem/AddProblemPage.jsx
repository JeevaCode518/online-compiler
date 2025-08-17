import React, { useState } from "react";
import Header from "../Header/Header";
import "./AddProblemPage.css";

const AddProblemPage = () => {
  const userId = "687efc7d8ac7ecb9ccdf72b0";

  const [problem, setProblem] = useState({
    title: "",
    problemNum: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const problemData = {
      ...problem,
      tags: problem.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      createdBy: userId
    };

    console.log("Sending problem to backend:", problemData);
    alert("Problem submitted! Check console.");
  };

  return (
    <>
      <Header />
      <div className="add-problem-page">
        <div className="form-container">
          <h2>Add New Problem</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-row">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={problem.title}
                onChange={handleChange}
                required
                className="main-input"
              />
            </div>

            {/* Problem Number */}
            <div className="form-row">
              <label htmlFor="problemNum">Problem Number</label>
              <input
                id="problemNum"
                type="number"
                name="problemNum"
                value={problem.problemNum}
                onChange={handleChange}
                required
                className="main-input"
              />
            </div>

            {/* Description */}
            <div className="form-row">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={problem.description}
                onChange={handleChange}
                required
                className="large-textarea"
              />
            </div>

            {/* Difficulty */}
            <div className="form-row">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={problem.difficulty}
                onChange={handleChange}
                className="main-input"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Tags */}
            <div className="form-row">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                id="tags"
                type="text"
                name="tags"
                value={problem.tags}
                onChange={handleChange}
                className="main-input"
              />
            </div>

            {/* Constraints */}
            <div className="form-row">
              <label htmlFor="constraints">Constraints</label>
              <input
                id="constraints"
                type="text"
                name="constraints"
                value={problem.constraints}
                onChange={handleChange}
                className="main-input"
              />
            </div>

            {/* Sample Input */}
            <div className="form-row">
              <label htmlFor="sampleInput">Sample Input</label>
              <textarea
                id="sampleInput"
                name="sampleInput"
                value={problem.sampleInput}
                onChange={handleChange}
                className="large-textarea"
              />
            </div>

            {/* Sample Output */}
            <div className="form-row">
              <label htmlFor="sampleOutput">Sample Output</label>
              <textarea
                id="sampleOutput"
                name="sampleOutput"
                value={problem.sampleOutput}
                onChange={handleChange}
                className="large-textarea"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn">
              Submit Problem
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProblemPage;