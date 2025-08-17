import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages as prismLanguages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import '../App.css'
import '../EditorStyle.css';
import api from '../axios';

function Compiler() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [customInput, setCustomInput] = useState('');

  const sampleCodes = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,
    py: `print("Hello, Python!")`
  };

  useEffect(() => {
    setCode(sampleCodes[language]);
  }, [language]);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input: customInput
    };

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const { data } = await api.post(BASE_URL, payload);
      setOutput(data.output);
    } catch (error) {
      const errorVal = (error?.response || error);
      setOutput("Error running code.");
    }
  };
  const handleChange  = (e) =>{
    setLanguage(e.target.value);
    setOutput('');
  }
  return (
    <div className="container">
      <h1 className="heading">AlgoU Online Code Compiler</h1>

      <select
        className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500"
        value={language}
        onChange={(e) => handleChange(e)}
      >
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="py">Python</option>
      </select>

      <div className="editor-wrapper">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            highlight(code, prismLanguages[language === 'cpp' || language === 'c' ? 'c' : language])
          }
          padding={10}
          className="code-editor"
        />
      </div>

      <textarea
        className="input-box"
        placeholder="Enter custom input (optional)..."
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        rows={5}
      />
      <br></br>

      <button onClick={handleSubmit} type="button" className="run-button">
        <svg xmlns="http://www.w3.org/2000/svg" className="run-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
        Run
      </button>

      {output && (
        <div className="outputbox">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default Compiler;