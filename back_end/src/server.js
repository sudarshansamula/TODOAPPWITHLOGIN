const http=require('http');
const app=require('./app');
const PORT='5001';

app.set('port', PORT);

const server = http.createServer(app);
const fileName='server.js';

/**
 * Listen on provided port, on all network interfaces.
 */
  server.listen(PORT);
  server.on('error', onError);
  server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof PORT === 'string'
      ? `Pipe ${PORT}`
      : `Port ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  const addr = server.address();
  console.log("Server started at port number",addr.port)
  const bind = typeof addr === 'string' ? 'pipe ' + addr : `port ${addr.port}`;
}

process.on('uncaughtException', (err) => {
  console.log("uncaughtException",err)
});

process.on('uncaughtExceptionnhandledPromiseRejectionWarning', (err) => {
  console.log("uncaughtExceptionnhandledPromiseRejectionWarning",err)
});

module.exports =server;

