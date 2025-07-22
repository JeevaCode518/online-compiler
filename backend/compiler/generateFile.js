import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// 👇 These two lines replace __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

console.log("DIR_CODES ", dirCodes);

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile = (format, content) =>{
    const jobID = uuidv4();
    const fileName = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    console.log("FILE PATH ", filePath);
    fs.writeFileSync(filePath, content);
    console.log("CONSERAT  ..")
    return filePath;
}

export default generateFile;