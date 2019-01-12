#!/usr/bin/env node

import 'make-promises-safe';
import http from 'http';
import app from '@app';
import { print } from '@utils';

const server = http.createServer(app);
const PORT = parseInt(process.env.PORT, 10) || 3000;

server.listen(PORT);

server.on('listening', () => {
  print.info(`App Server is up! Listening: ${PORT}`);
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      print.error('Not enough privileges to run application server.', -1);
      break;
    case 'EADDRINUSE':
      print.error(`${PORT} is already in use.`, -1);
      break;
    default:
      throw err;
  }
});

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close(() => {
      process.exit();
    });
  });
});
