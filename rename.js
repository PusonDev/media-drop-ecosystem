const fs = require('fs');
const path = require('path');

const dirsToScan = ['./ultrasave-website', './ultrasave-windows', './ultrasave-android'];
const exts = ['.tsx', '.ts', '.jsx', '.js', '.json', '.html', '.md', '.txt', '.yaml'];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/UltraSave/g, 'Media Drop')
    .replace(/MediaDrop/g, 'Media Drop')
    .replace(/ultrasave/g, 'mediadrop');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (exts.includes(ext) || file === 'llms.txt' || file === 'package.json') {
        replaceInFile(fullPath);
      }
    }
  }
}

dirsToScan.forEach(scanDir);
console.log('Renaming done.');
