import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import api from "../../axios";
import "./ProblemPage.css";
import { useParams } from "react-router-dom";
import AiReviewPopup from "../AiReviewPopup/AiReviewPopup";
import Header from "../Header/Header";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const defaultCode = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
};

const ProblemPage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(defaultCode.java);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [showConsole, setShowConsole] = useState(false);
  const [aiReview, setAiReview] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [popupCode, setPopupCode] = useState("");
  const [popupLanguage, setPopupLanguage] = useState("java");

  // New: Left panel tab & submissions
  const [leftTab, setLeftTab] = useState("problem");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api
      .get(`https://codeverse-v5df.onrender.com/api/problems/${problemId}`)
      // .get(`http://localhost:8001/api/problems/${problemId}`)
      .then((res) => setProblem(res.data))
      .catch((err) => console.error(err));
  }, [problemId]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);

    if (leftTab === "submissions") {
      api
        .get(`https://codeverse-v5df.onrender.com/api/getSubmissions?userId=${userId}&problemId=${problemId}`)
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error(err));
    }
  }, [leftTab, problemId]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
  };

  const openConsole = (tab) => {
    setShowConsole(true);
    setActiveTab(tab);
  };

  const openCodePopup = (code, language) => {
    setPopupCode(code);
    setPopupLanguage(language);
    setShowCodePopup(true);
  };

  const closeCodePopup = () => setShowCodePopup(false);

  const runCode = async () => {
    openConsole("output");
    try {
      const res = await api.post(
        "https://online-compiler-0ywr.onrender.com/api/run",
        {
          language,
          code,
          input,
        }
      );
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.message || "Error running code");
    }
  };

  const submitCode = async () => {
    openConsole("verdict");
    const userId = localStorage.getItem("userId");
    // console.log(userId);

    try {
      const res = await api.post(
        "https://online-compiler-0ywr.onrender.com/api/submit",
        {
          language,
          code,
          problemId,
          userId,
        }
      );
      setVerdict(res.data.summary.status || "No verdict yet");
    } catch (err) {
      setVerdict(err.message || "Error submitting code");
    }
  };

  const getAiReview = async () => {
    setShowPopup(true);
    setLoadingReview(true);
    try {
      const res = await api.post(
        "https://codeverse-v5df.onrender.com/api/ai-review",
        {
          code,
        }
      );
      setAiReview(res.data.message);
    } catch (error) {
      setAiReview("⚠️ Error getting AI review.");
    } finally {
      setLoadingReview(false);
    }
  };

  if (!problem) return <div className="loading">Loading...</div>;

  return (
    <>
      <Header />
      <div className="problem-page">
        {/* Left panel */}
        <div className="problem-box">
          <div className="left-panel-buttons">
            <button
              className={leftTab === "problem" ? "active" : ""}
              onClick={() => setLeftTab("problem")}
            >
              Problem
            </button>
            <button
              className={leftTab === "submissions" ? "active" : ""}
              onClick={() => setLeftTab("submissions")}
            >
              Submissions
            </button>
          </div>

          {leftTab === "problem" && (
            <div className="problem-content">
              <h2 className="problem-title">{problem.title}</h2>
              <span
                className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
              >
                {problem.difficulty}
              </span>

              <div className="section-heading">Description</div>
              <p>{problem.description}</p>

              <div className="section-heading">Constraints</div>
              <p>{problem.constraints}</p>

              <div className="section-heading">Tags</div>
              <div className="tags">
                {problem.tags.map((tag, idx) => (
                  <span className="tag" key={idx}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="section-heading">Sample Test Case</div>
              <div className="sample-test">
                <pre>Input: {problem.sampleInput}</pre>
                <pre>Output: {problem.sampleOutput}</pre>
              </div>
            </div>
          )}

          {leftTab === "submissions" && (
            <div className="submission-content">
              {submissions.length === 0 ? (
                <p>No submissions yet.</p>
              ) : (
                <table className="submission-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Language</th>
                      <th>Status</th>
                      <th>Passed</th>
                      <th>Submitted At</th>
                      <th>Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub, idx) => (
                      <tr
                        key={sub._id}
                        className={
                          sub.summary.failed === 0 ? "accepted" : "failed"
                        }
                      >
                        <td>{idx + 1}</td>
                        <td>{sub.language}</td>
                        <td>
                          {sub.summary.failed === 0
                            ? "✅ Accepted"
                            : `❌ Failed at test ${sub.summary.failedAt}`}
                        </td>
                        <td>
                          {sub.summary.passed}/{sub.summary.total}
                        </td>
                        <td>{new Date(sub.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="view-code-btn"
                            onClick={() =>
                              openCodePopup(sub.code, sub.language)
                            }
                          >
                            {"</>"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="editor-box">
          <div className="editor-header">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <div className="editor-container">
            <AceEditor
              mode={language === "cpp" ? "c_cpp" : language}
              theme="monokai"
              value={code}
              onChange={(value) => setCode(value)}
              name="codeEditor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="400px"
              fontSize={14}
              style={{ borderRadius: "12px", overflow: "hidden" }}
            />
          </div>

          {/* Console */}
          <div
            className={`console-panel ${showConsole ? "visible" : "hidden"}`}
          >
            <div className="console-tabs">
              <button
                className={activeTab === "input" ? "active" : ""}
                onClick={() => setActiveTab("input")}
              >
                Input
              </button>
              <button
                className={activeTab === "output" ? "active" : ""}
                onClick={() => setActiveTab("output")}
              >
                Output
              </button>
              <button
                className={activeTab === "verdict" ? "active" : ""}
                onClick={() => setActiveTab("verdict")}
              >
                Verdict
              </button>
            </div>

            <div className="console-content">
              {activeTab === "input" && (
                <textarea
                  placeholder="Custom Input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="console-textarea editable"
                />
              )}
              {activeTab === "output" && (
                <textarea
                  value={output || "No output yet"}
                  readOnly
                  className="console-textarea"
                />
              )}
              {activeTab === "verdict" && (
                <div className="console-textarea verdict-box">
                  <textarea
                    value={verdict || "Please submit your code to get verdict"}
                    readOnly
                    className="console-textarea"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button className="btn blue" onClick={() => openConsole("input")}>
              Console
            </button>
            <button className="btn green" onClick={runCode}>
              Run
            </button>
            <button className="btn red" onClick={submitCode}>
              Submit
            </button>
            <button className="btn purple" onClick={() => getAiReview()}>
              AI Review
            </button>
          </div>

          <AiReviewPopup
            show={showPopup}
            loading={loadingReview}
            review={aiReview}
            onClose={() => setShowPopup(false)}
          />
        </div>
      </div>
      {showCodePopup && (
        <div className="code-popup-overlay" onClick={closeCodePopup}>
          <div className="code-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Submitted Code</h3>
              <button onClick={closeCodePopup} className="close-btn">
                ✖
              </button>
            </div>
            <AceEditor
              mode={popupLanguage === "cpp" ? "c_cpp" : popupLanguage}
              theme="monokai"
              value={popupCode}
              readOnly={true}
              width="100%"
              height="400px"
              fontSize={14}
              setOptions={{ useWorker: false }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemPage;
