import express from 'express';
import axios from 'axios';
// import { createHttpResponseLogger } from './create-http-response-logger';
import { AdaptiveThrottler } from './adaptive-throttler';

const server = express();
// server.use(createHttpResponseLogger());

const throttler = new AdaptiveThrottler(10000);

server.get('/graph', async (_, res) => {
  try {
    const response = await throttler.makeRequest(() =>
      axios.get('http://api:8080/data', {
        validateStatus: () => true
      })
    );
    // const response = await axios.get('http://api:8080/data', {
    //   validateStatus: () => true
    // });
    res.status(response.status);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(503);
    res.send({ err });
  }
});

server.listen(8081, () => {
  console.log(`Running on :8081 👍`);
});
