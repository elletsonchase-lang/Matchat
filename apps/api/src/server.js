import http from 'node:http';

const PORT = process.env.API_PORT || 4000;

const sendJson = (res, status, payload) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  if (!req.url) return sendJson(res, 400, { error: 'invalid_request' });

  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, {
      service: 'matchat-api',
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'GET' && req.url === '/v1/safety/config') {
    return sendJson(res, 200, {
      moderationProvider: process.env.MODERATION_PROVIDER || 'mock',
      moderationThreshold: Number(process.env.MODERATION_THRESHOLD || 0.8)
    });
  }

  return sendJson(res, 404, { error: 'not_found' });
});

if (process.argv.includes('--check')) {
  console.log('API server file is valid and loadable.');
  process.exit(0);
}

server.listen(PORT, () => {
  console.log(`Matchat API listening on :${PORT}`);
});
