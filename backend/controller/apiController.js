import generateFile from "../compiler/generateFile.js";
import executeCpp from "../compiler/executeCpp.js";
import executeJava from "../compiler/executeJava.js";


export const compiler = async (request, response) =>{

    const { language, code } = request.body;
    console.log("CODE ", code);

    if (code === undefined) {
        return response.status(404).json({ success: false, error: "Enter Valid Code!" });
    }
    try {
        const filePath = generateFile(language, code);

        let output;
        if (language === 'java') {
            output = await executeJava(filePath);
        } else {
            output = await executeCpp(filePath);
        }
        response.json({ filePath, output });
    } catch (error) {
        response.status(500).json({ error: error });
    }
};