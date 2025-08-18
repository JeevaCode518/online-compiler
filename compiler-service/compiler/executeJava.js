import { spawn } from 'child_process';

const executeJava = (filePath, input = '') => {
  return new Promise((resolve, reject) => {
    const run = spawn('java', [filePath]);

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
    }, 50000); //15 seconds max;

    run.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0) {
        reject(error || 'Runtime error');
      } else {
        resolve(output.trim());
      }
    });
  });
};

export default executeJava;