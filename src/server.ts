import express from 'express';
import rateLimit from 'express-rate-limit';
import { createHttpResponseLogger } from './create-http-response-logger';

const limiter = rateLimit({
  windowMs: 1 * 1000,
  max: 10
});

const server = express();
server.use(createHttpResponseLogger());
server.use(limiter);

server.get('/data', (_, res) => {
  res.send({ message: 'ok' });
});

server.listen(8080, () => {
  console.log(`Running on :8080 👍`);
});
