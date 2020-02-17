import express from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 1000, // 15 minutes
  max: 5 // limit each IP to 100 requests per windowMs
});

const server = express();

server.use(limiter);

server.get('/api', (_, res) => {
  res.send({message: 'ok'});
});

server.listen(8080, () => {
  console.log(`Running on :8080 👍`);
});
