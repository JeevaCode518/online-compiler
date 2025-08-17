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
}`
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

  useEffect(() => {
    api
      .get(`https://codeverse-v5df.onrender.com/api/problems/${problemId}`)
      .then((res) => setProblem(res.data))
      .catch((err) => console.error(err));
  }, [problemId]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
  };

  const openConsole = (tab) => {
    setShowConsole(true);
    setActiveTab(tab);
  };

  const runCode = async () => {
    openConsole("output");
    try {
      const res = await api.post("https://compiler-service-5phd.onrender.com/api/run", {
        language,
        code,
        input
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.message || "Error running code");
    }
  };

  const submitCode = async () => {
    openConsole("verdict");
    try {
      const res = await api.post("https://compiler-service-5phd.onrender.com/api/submit", {
        language,
        code,
        problemId
      });
      setVerdict(res.data.results);
    } catch (err) {
      setVerdict(err.message || "Error submitting code");
    }
  };

  const getAiReview = async () => {
    setShowPopup(true);
    setLoadingReview(true);
    try {
      const res = await api.post("https://codeverse-v5df.onrender.com/api/ai-review", {
        code,
      });
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
        <h2 className="problem-title">{problem.title}</h2>
        <span className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>

        <div className="section-heading">Description</div>
        <p>{problem.description}</p>

        <div className="section-heading">Constraints</div>
        <p>{problem.constraints}</p>

        <div className="section-heading">Tags</div>
        <div className="tags">
          {problem.tags.map((tag, idx) => (
            <span className="tag" key={idx}>{tag}</span>
          ))}
        </div>

        <div className="section-heading">Sample Test Case</div>
        <div className="sample-test">
          <pre>Input: {problem.sampleInput}</pre>
          <pre>Output: {problem.sampleOutput}</pre>
        </div>
      </div>

      {/* Right panel */}
      <div className="editor-box">
        <div className="editor-header">
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
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
        <div className={`console-panel ${showConsole ? "visible" : "hidden"}`}>
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
                {Array.isArray(verdict) ? (
                  <>
                    <p>
                      ✅ Passed: {verdict.filter(t => t.passed).length} / {verdict.length}
                    </p>
                    {verdict.map((test, idx) => (
                      <div key={idx} className={`verdict-test ${test.passed ? "passed" : "failed"}`}>
                        <strong>Test {idx + 1}:</strong> {test.passed ? "Passed ✅" : "Failed ❌"}
                      </div>
                    ))}
                  </>
                ) : (
                  <textarea
                    value={verdict || "No verdict yet"}
                    readOnly
                    className="console-textarea"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <button className="btn blue" onClick={() => openConsole("input")}>Console</button>
          <button className="btn green" onClick={runCode}>Run</button>
          <button className="btn red" onClick={submitCode}>Submit</button>
          <button className="btn purple" onClick={() => getAiReview()}>AI Review</button>
        </div>

        <AiReviewPopup
          show={showPopup}
          loading={loadingReview}
          review={aiReview}
          onClose={() => setShowPopup(false)}
        />
      </div>
    </div>
  </>
  );
};

export default ProblemPage;