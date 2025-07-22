import  { exec } from 'child_process';
import path from 'path';

const executeJava = async (filePath) => {
    const dirName = path.dirname(filePath); // "codes" directory
    const className = path.basename(filePath, '.java');

    return new Promise((resolve, reject) => {
        exec(
            `java ${filePath}`,
            (error, stdout, stderr) => {
                if (error) 
                    return reject(error.message);
                if (stderr) 
                    return reject(stderr);
                resolve(stdout);
            }
        );
    });
};

// const filePath = 'D:\\Projects\\online-compiler\\backend\\compiler\\codes\\Main.java';

// executeJava("D:/Projects/online-compiler/backend/compiler/codes/752bd8c6-1241-4984-a37a-03e28016b356.java")
//   .then(output => console.log("Output:\n", output))
//   .catch(err => console.error("Error:\n", err));

export default executeJava;