const http = require('http');

const server = http.createServer((req, res) => {
  // Cho phép frontend gọi API qua CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  
  const responseData = {
    message: '🚀 Hello từ Backend Node.js!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.end(JSON.stringify(responseData, null, 2));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});