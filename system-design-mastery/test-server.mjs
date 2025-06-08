import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer((req, res) => {
  let filePath = join(__dirname, 'out', req.url === '/' ? 'index.html' : req.url);
  
  // Handle routes without extensions
  if (!extname(filePath)) {
    filePath += '.html';
  }
  
  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`
🚀 System Design Mastery - Test Server Running!
================================================
    
Local URL: http://localhost:${PORT}
    
Test these pages:
- Homepage: http://localhost:${PORT}/
- Fundamentals: http://localhost:${PORT}/fundamentals
- Physics Module: http://localhost:${PORT}/fundamentals/physics
- Playground: http://localhost:${PORT}/playground
    
Press Ctrl+C to stop the server.
`);
});
