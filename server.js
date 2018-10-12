require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var compression = require('compression');
var server = express();

// require('console-stamp')(console, 'HH:MM:ss.l');
server.use(compression());
// server.use(require('morgan')('short'));

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, './'), { maxAge: '30 days' }));
server.use('/artists/:artistID/', express.static(path.join(__dirname, './'), { maxAge: '30 days' }));

server.use(cors());
// Albums & Player

server.all('/api/v1/artists/:artistID/albums/', (req, res, next) => {
  // console.log('ec2-54-164-130-42.compute-1.amazonaws.com' + req.url);
  res.redirect('http://54.164.130.42' + req.url);
  next();
});

// Related Artists
server.all('/api/v1/artists/:id/related-artists', (req, res) => {
  const { id } = req.params;
  res.redirect(`http://54.148.230.254:3002/api/v1/artists/${id}/related-artists`);
});

// Popular Songs
server.all('/api/v1/artists/:id/popular-songs', (req, res) => {
  res.redirect('http://13.56.189.115' + req.url);
});

// Header
server.all('/api/v1/artists/:artistID', (req, res) => {
  // console.log(req.url);
  res.redirect('http://18.221.180.131' + req.url);
});

if (process.env.NODE_MULTI) {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server

    server.listen(3000, console.log('Listening on:', 3000));

    console.log(`Worker ${process.pid} started`);
  }
} else {
  console.log('Running on Single Core');
  server.listen(3000, console.log('Listening on:', 3000));
}
