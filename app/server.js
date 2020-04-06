const http = require('http');
const { cyan, red } = require('chalk');
const app = require('./index');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';
const server = http.createServer(app).listen(PORT, HOST);

server.on('listening', () => {
  console.info(cyan(`App Server is up! Listening: ${PORT}`));
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(red('Not enough privileges to run application server.'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(red(`${PORT} is already in use.`));
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
