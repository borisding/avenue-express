#!/usr/bin/env node

import 'make-promises-safe';
import http from 'http';
import app from '@app';
import { print } from '@utils';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT);

server.on('listening', () => {
  const address = server.address();

  print.info('App Server is up! Listening: %s', 0, [
    'port' in address ? address.port : address
  ]);
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      print.error('Not enough privileges to run application server.', -1);
      break;
    case 'EADDRINUSE':
      print.error('%s is already in use.', -1, [PORT]);
      break;
    default:
      throw err;
  }
});
