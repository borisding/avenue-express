#!/usr/bin/env node

const http = require('http');
const app = require('@app');
const { isDev } = require('@config');
const { print } = require('@utils');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const server = http.createServer(app).listen(PORT, HOST);

server.on('listening', () => {
  print.info(`App Server is up! Listening: ${PORT}`);
  if (isDev) {
    const url = `http://${HOST}:${PORT}`;
    require('open')(url);
  }
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      print.error('Not enough privileges to run application server.', -1);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      print.error(`${PORT} is already in use.`, -1);
      process.exit(1);
      break;
    default:
      throw err;
  }
});

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
  process.on(signal, () => {
    server.close();
    process.exit();
  });
});
