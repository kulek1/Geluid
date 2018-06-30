import express from 'express';

const path = require('path');

export default function createServer() {
  const app = express();

  const url = path.resolve('client/build/');
  app.use('/', express.static(url));
  app.listen(9000, () => console.log('Listening on port 9000'));
}
