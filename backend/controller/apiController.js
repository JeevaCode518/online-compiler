import generateFile from "../compiler/generateFile.js";
import executeCpp from "../compiler/executeCpp.js";


export const compiler = async (request, response) =>{

    const { language = 'cpp', code } = request.body;
    console.log("CODE ", code);

    if (code === undefined) {
        return response.status(404).json({ success: false, error: "Enter Valid Code!" });
    }
    try {
        const filePath = generateFile(language, code);
        const output = await executeCpp(filePath);
        console.log("OUTPUT ", output);

        response.json({ filePath, output });
    } catch (error) {
        response.status(500).json({ error: error });
    }
};