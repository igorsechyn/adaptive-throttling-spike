import express from 'express';
import axios from 'axios';

const server = express();

server.get('/api', async (_, res) => {
  try {
    const response = await axios.get('http://localhost:8080/api', {
      validateStatus: () => true, 
    });
    res.send(response.data);  
    res.status(response.status);
  } catch (err) {
    console.log(err);
    res.send({err});
    res.status(503);
  }
});

server.listen(8081, () => {
  console.log(`Running on :8081 👍`);
});
