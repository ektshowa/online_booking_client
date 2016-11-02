var http = require('http');

var canned = require('canned');
var opts = { cors:true, logger: process.stdout };
can = canned('.', opts);

var express = require('express');
var app = express();

app.use(can);

http.createServer(app).listen(5000);
