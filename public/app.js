var express = require('express');
var logger = require('morgan');

var path = require('path');

var app = express();

//app.use(logger({ immediate: true, format: 'dev' }));
app.use(logger('dev', { immediate: true }));

//app.get('/index.get.json', function(req, res) {
    //var html = path.resolve(__dirname + '/../index.html');
    //var json = path.resolve(__dirname + '/../index.get.json');
    //res.sendfile(json);	
    //response = {
    //	roomNumber:res.body.roomNumber,
    //	roomCategory:res.body.roomCategory
    //};
   // console.log(response);
   // res.end(JSON.stringify(response));
//});
app.get('/index.get.json/:id', function(req, res) {
	res.send('get id ' + req.params.id);
});

app.listen(5000);
console.log("Server is running.");
