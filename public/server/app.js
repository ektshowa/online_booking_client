var express = require('express');
var logger = require('morgan');

var path = require('path');

var app = express();
var data = require('./rooms.json');

//app.use(logger({ immediate: true, format: 'dev' }));
app.use(logger('dev', { immediate: true }));

app.use(function(req, res, next) {
	var delay = parseFloat(req.headers['x-delay']);
	if (delay) {
		setTimeout(function() {
			next();
		}, delay);
	}
	else {
		next();
	}
});

app.get('/', function(req, res) {
    var html = path.resolve(__dirname + '/../index.html');
    var json = path.resolve(__dirname + '/index.get.json');
    res.sendfile(json);	
    
});

app.get('/index.get.json/:id', function(req, res) {
	var json = path.resolve(__dirname + '/index.get.json');
    //res.sendfile(json);
    var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
    var jsonObject = JSON.parse(text);
    //res.send('room ' + req.params.id);
    res.append('Access-Control-Allow-Origin', 'http://mailinglistclient.local');
    res.send(data);	
});


app.listen(5000);
console.log("Server is running.");
