var express = require('express');
var path    = require('path');
var app     = express();
var port    = process.env.PORT || 5000;

app.listen(port, function() { console.log("Listening on " + port) });

app.use(express.static(path.join(__dirname, 'app')));

var getOptions = require('./searchOptions.js');
var getAuctions = require('./searchAuctions.js');
app.get('/options', getOptions.searchOptions);
app.get('/search', getAuctions.searchAuctions);

console.log("HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY");