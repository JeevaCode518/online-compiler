import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import api from "../../axios";
import "./ProblemPage.css";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'

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
  
  useEffect(() => {
    api
      .get(`http://localhost:8000/api/problems/${problemId}`)
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
      const res = await api.post("http://localhost:5000/api/run", {
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
    const res = await api.post("http://localhost:5000/api/submit", {
      language,
      code,
      problemId
    });
    console.log("VERDICT", res.data);
    setVerdict(res.data.results); // ✅ fixed key
  } catch (err) {
    setVerdict(err.message || "Error submitting code");
  }
};

const getAiReview = async () => {
  try {
    const res = await api.post("http://localhost:8000/api/ai-review", {
      code
    });
    setAiReview(res.data.message);
    setShowPopup(true); // open popup after review is received
  } catch (error) {
    console.log("Error getting AI-review");
  }
};

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="problem-page">
      {/* Problem Description */}
      <div className="problem-description">
        <h2 className="problem-title">{problem.title}</h2>
        {/* <p><strong>Difficulty:</strong> {problem.difficulty}</p> */}
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

      {/* Code Editor */}
      <div className="code-editor-section">
        <div className="editor-header">
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

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
          style={{ borderRadius: "8px", overflow: "hidden" }}
        />

        {/* Console Panel */}
        <div className={`console-panel-light ${showConsole ? "console-visible" : "console-hidden"}`}>
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
  <div className="console-textarea">
    {Array.isArray(verdict) ? (
      <>
        <p>
          ✅ Passed: {verdict.filter(t => t.passed).length} / {verdict.length}
        </p>
        {verdict.map((test, idx) => (
          <div
            key={idx}
            className={`verdict-test ${test.passed ? "passed" : "failed"}`}
          >
            <strong>Test {idx + 1}:</strong> {test.passed ? "Passed ✅" : "Failed ❌"}
            <br />
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
          <button id="consolebtn" onClick={() => openConsole("input")}>Console</button>
          <button id="runbtn" onClick={runCode}>Run</button>
          <button id="submitbtn" onClick={submitCode}>Submit</button>
        </div>
        <button id="consolebtn" onClick={() => getAiReview()}>AiReview</button>

        {/* <textarea
                value={<Markdown>aiReview</Markdown> || "No Review yet"}
                readOnly
                className="console-textarea"
        /> */}
        <div className="console-textarea">
          {aiReview ? (
            <Markdown>{aiReview}</Markdown>
          ) : (
            <p>No Review yet</p>
          )}
      </div>
        
      </div>
    </div>
  );
};

export default ProblemPage;
