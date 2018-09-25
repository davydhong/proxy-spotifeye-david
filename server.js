const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var compression = require('compression');

var server = express();
server.use(compression())
server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, './'), { maxAge: '30 days' }));
server.use(cors());

// Albums & Player
server.get('/artists/albums/:artistID', (req, res) => {
  res.redirect('http://52.15.129.193' + req.url);
});

// Related Artists
server.get('/artist/:id/relatedArtists', (req, res) => {
  res.redirect('http://18.206.245.56' + req.url);
});

// Popular Songs
server.get('/artist/:id', (req, res) => {
  res.redirect('http://18.224.17.253' + req.url);
});

// Header
server.get('/artists/:artistID', (req, res) => {
   res.redirect('http://35.172.133.115' + req.url);
});

server.listen(3000, console.log('Listening on:', 3000));