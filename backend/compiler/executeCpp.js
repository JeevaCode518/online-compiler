import  { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");
console.log("outputPath ",outputPath);

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive:true});
}

const executeCpp = async (filePath) =>{
    const jobID = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobID}.exe`);
    
// 'D:\\Projects\\online_com\\backend\\outputs\\32bf409c-b1cd-4f28-b227-11af527999ab.exe'

    return new Promise((resolve, rejects) =>{
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ${jobID}.exe`, (error, stdout, stderr) => {
            if(error)
                return rejects(error.message);
            if(stderr)
                return rejects(stderr);
            resolve(stdout);
        });
    });
}

// executeCpp("D:/Projects/online_com/backend/codes/32bf409c-b1cd-4f28-b227-11af527999ab.cpp")
//   .then(output => console.log("Output:\n", output))
//   .catch(err => console.error("Error:\n", err));



export default executeCpp;