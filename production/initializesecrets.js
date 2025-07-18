const fs = require('fs');
const path = require('path');

const secretsDir = path.join(__dirname, 'secrets');
const secretFiles = [
  'GOOGLE_CLIENT_ID.txt',
  'GOOGLE_CLIENT_SECRET.txt',
  'GITHUB_CLIENT_ID.txt',
  'GITHUB_CLIENT_SECRET.txt',
];

// Create the secrets directory if it doesn't exist
if (!fs.existsSync(secretsDir)) {
  fs.mkdirSync(secretsDir, { recursive: true });
  console.log('Created secrets directory.');
} else {
  console.log('Secrets directory already exists.');
}

// Create each secret file if it doesn't exist
secretFiles.forEach(filename => {
  const filePath = path.join(secretsDir, filename);
  const lowercaseFilePath = path.join(secretsDir, filename.toLocaleLowerCase);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', { encoding: 'utf-8' });
    console.log(`Created empty secret file: ${filename}`);
  } else {
    console.log(`Secret file already exists: ${filename}`);
    fs.renameSync(filePath, filePath.toLowerCase);
  }
});