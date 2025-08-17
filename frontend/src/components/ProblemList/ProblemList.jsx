import React, { useEffect, useState } from "react";
import "./ProblemList.css";
import api from "../../axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get("https://codeverse-v5df.onrender.com/api/problems", {
          withCredentials: true
        });
        console.log(res);
        setProblems(res.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <>
  <Header />
  <div className="problem-list-page">
    <div className="problem-list-container">
      <h2 className="heading">All Problems</h2>
      {problems.length > 0 ? (
        problems.map((problem) => (
          <Link
            to={`/problems/${problem._id}`}
            key={problem._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="problem-card">
              <div className="problem-number-name">
                <span className="problem-number">#{problem.problemNum}</span>
                <span className="problem-name">{problem.title}</span>
                <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>

              <div className="problem-tags">
                {problem.tags.slice(0, 5).map((tag, idx) => (
                  <span className="tag" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No problems found</p>
      )}
    </div>
  </div>
</>
  );
};

export default ProblemList;