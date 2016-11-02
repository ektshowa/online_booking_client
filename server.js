var http = require('http');
var logger = require('morgan');

var canned = require('canned');
var opts = { cors:true, logger: process.stdout };
can = canned('.', opts);

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(can);

var port = 5000;
http.createServer(app).listen(port, function() {
	console.log('Frontend listening at %s', port);
});
