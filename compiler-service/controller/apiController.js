import generateFile from "../compiler/generateFile.js";
import executeCpp from "../compiler/executeCpp.js";
import executeJava from "../compiler/executeJava.js";
 import axios from "axios";

export const compiler = async (request, response) => {
    const { language, code, input } = request.body;

    if (!code) {
        return response.status(400).json({ success: false, error: "Enter Valid Code!" });
    }

    try {
        const filePath = generateFile(language, code);

        let output;
        if (language === 'java') {
            output = await executeJava(filePath, input);
        } else {
            output = await executeCpp(filePath, input);
        }

        response.json({ filePath, output });
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
};

// export const runHiddenTests = async (req, res) => {
//   console.log("HIDDEN TEST CASE");
//   const { language, code, problemId, userId} = req.body;

//   if (!code) {
//     return res.status(400).json({ success: false, error: "Enter Valid Code!" });
//   }

//   try {
//     // 1️⃣ Generate file for the code
//     const filePath = generateFile(language, code);

//     // 2️⃣ Fetch hidden test cases from DB
//     const { data } = await axios.get(
//         `https://codeverse-v5df.onrender.com/api/problems/${problemId}/hidden`
//     );

//     console.log("Hidden Test Cases ", data)
//     const hiddenTestCases = data.hiddenTestCases;

//     console.log(hiddenTestCases);
//     // 3️⃣ Run hidden tests
//     const results = [];
//     let passedCount = 0;
//     let failedAt = null;

//     for (let i = 0; i < hiddenTestCases.length; i++) {
//       const testCase = hiddenTestCases[i];
//       try {
//         let output;

//         if (language === "java") {
//           output = await executeJava(filePath, testCase.input);
//         } else if (language === "cpp") {
//           output = await executeCpp(filePath, testCase.input);
//         } else {
//           throw new Error(`Unsupported language: ${language}`);
//         }

//         const passed = output.trim() === testCase.output.trim();

//         results.push({
//           index: i + 1,
//           input: testCase.input,
//           expected: testCase.output,
//           actual: output,
//           passed
//         });

//         if (passed) {
//           passedCount++;
//         } else {
//           failedAt = i + 1; // store the 1-based index of failed case
//           // ❗ If you want to stop at first fail, uncomment below
//           // break;
//         }

//       } catch (err) {
//         results.push({
//           index: i + 1,
//           input: testCase.input,
//           error: err.toString(),
//           passed: false
//         });
//         failedAt = i + 1;
//         // ❗ Uncomment if you want to stop immediately on error
//         // break;
//       }
//     }

//     // 4️⃣ Send results + summary to frontend
//     return res.json({
//       summary: {
//         total: hiddenTestCases.length,
//         passed: passedCount,
//         failed: hiddenTestCases.length - passedCount,
//         failedAt // null if none failed
//       },
//       results
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.toString() });
//   }
// };

export const runHiddenTests = async (req, res) => {
  console.log("HIDDEN TEST CASE");
  const { language, code, problemId, userId } = req.body; // added userId
  console.log("DATA  ", language, code, problemId, userId);
  if (!code) {
    return res.status(400).json({ success: false, error: "Enter Valid Code!" });
  }

  try {
    // 1️⃣ Generate file for the code
    const filePath = generateFile(language, code);

    // 2️⃣ Fetch hidden test cases from DB
    
    const { data } = await axios.get(
        `https://codeverse-v5df.onrender.com/api/problems/${problemId}/hidden`
    );

    console.log("Hidden Test Cases ", data)
    const hiddenTestCases = data.hiddenTestCases;

    console.log(hiddenTestCases);
    // 3️⃣ Run hidden tests
    const results = [];
    let passedCount = 0;
    let failedAt = null;

    for (let i = 0; i < hiddenTestCases.length; i++) {
      const testCase = hiddenTestCases[i];
      try {
        let output;

        if (language === "java") {
          output = await executeJava(filePath, testCase.input);
        } else if (language === "cpp") {
          output = await executeCpp(filePath, testCase.input);
        } else {
          throw new Error(`Unsupported language: ${language}`);
        }

        const passed = output.trim() === testCase.output.trim();

        results.push({
          index: i + 1,
          input: testCase.input,
          expected: testCase.output,
          actual: output,
          passed
        });

        if (passed) {
          passedCount++;
        } else {
          failedAt = i + 1; // store the 1-based index of failed case
          break;
        }

      } catch (err) {
        results.push({
          index: i + 1,
          input: testCase.input,
          error: err.toString(),
          passed: false
        });
        failedAt = i + 1;
      }
    }

    // 4️⃣ Send submission summary to backend
    try {
      await axios.post("https://codeverse-v5df.onrender.com/api/submissions", {
        userId,
        problemId,
        code,
        language,
        totalTests: hiddenTestCases.length,
        passedTests: passedCount,
        failedAt
      });
    } catch (backendErr) {
      console.error("Failed to save submission to backend:", backendErr.toString());
    }

    // 5️⃣ Send results + summary to frontend
    return res.json({
      summary: {
        total: hiddenTestCases.length,
        passed: passedCount,
        failed: hiddenTestCases.length - passedCount,
        failedAt,
        status: failedAt ? `Wrong Answer on test case ${failedAt}` : "Accepted"
      },
      results
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.toString() });
  }
};

