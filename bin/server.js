#!/usr/bin/env node

import 'make-promises-safe';
import http from 'http';
import app from '@src/index';
import { print } from '@utils';
import { ENV } from '@config';

const server = http.createServer(app);
const PORT = ENV['PORT'] || 3000;

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

process.on('SIGINT', () => {
  process.exit(0);
});
