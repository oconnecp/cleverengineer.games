const fs = require('fs');
const path = require('path');

const secretsDir = path.join(__dirname, 'secrets');
const secretFiles = [
  'google_client_id.txt',
  'google_client_secret.txt',
  'github_client_id.txt',
  'github_client_secret.txt',
  'db_encryption_key.txt',
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
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', { encoding: 'utf-8' });
    console.log(`Created empty secret file: ${filename}`);
  } else {
    console.log(`Secret file already exists: ${filename}`);
  }
});