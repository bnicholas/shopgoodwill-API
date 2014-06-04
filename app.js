var express = require('express');
var path    = require('path');
var app     = express();
var port    = process.env.PORT || 5000;
var os      = require('os');

console.log("os.platform "+os.platform());
console.log("os.type "+os.type());
console.log("os.release "+os.release());


app.listen(port, function() { console.log("Listening on " + port) });

var getOptions = require('./searchOptions.js');
var getAuctions = require('./searchAuctions.js');
app.get('/options', getOptions.searchOptions);
app.get('/search', getAuctions.searchAuctions);

console.log("HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY");