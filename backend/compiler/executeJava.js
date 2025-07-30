import { exec } from 'child_process';
import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';

const executeJava = (filePath, input = '') => {
  const dirName = path.dirname(filePath);
  const className = path.basename(filePath, '.java');

  return new Promise((resolve, reject) => {
    const compile = spawn('javac', [filePath]);

    let compileError = '';
    compile.stderr.on('data', (data) => {
      compileError += data.toString();
    });

    compile.on('exit', (code) => {
      if (code !== 0) {
        return reject(compileError || 'Compilation error');
      }

      const run = spawn('java', ['-cp', dirName, className]);

      let output = '';
      let error = '';

      if (input) {
        run.stdin.write(input);
      }
      run.stdin.end();

      run.stdout.on('data', (data) => {
        output += data.toString();
      });

      run.stderr.on('data', (data) => {
        error += data.toString();
      });

      const timeout = setTimeout(() => {
        run.kill();
        reject('Execution timed out');
      }, 5000); // 5 seconds max

      run.on('close', (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(error || 'Runtime error');
        } else {
          resolve(output);
        }
      });
    });
  });
};

export default executeJava;
