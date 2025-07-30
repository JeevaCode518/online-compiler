import generateFile from "../compiler/generateFile.js";
import executeCpp from "../compiler/executeCpp.js";
import executeJava from "../compiler/executeJava.js";


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
