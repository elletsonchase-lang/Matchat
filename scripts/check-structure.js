const fs = require('fs');

const required = [
  '.env.example',
  'apps/web/index.html',
  'apps/api/src/server.js',
  'db/migrations/0001_init.sql',
  'docs/ARCHITECTURE.md'
];

const missing = required.filter((path) => !fs.existsSync(path));

if (missing.length) {
  console.error('Missing required scaffold paths:');
  missing.forEach((m) => console.error(`- ${m}`));
  process.exit(1);
}

console.log('Scaffold structure check passed.');
