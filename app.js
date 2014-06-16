var express = require('express');
var path    = require('path');
var app     = express();
var port    = process.env.PORT || 5050;
var os      = require('os');

console.log("os.platform "+os.platform());
console.log("os.type "+os.type());
console.log("os.release "+os.release());

app.listen(port, function() { console.log("Listening on " + port) });

var getSellers = require('./getSellers.js');
var getCategories = require('./getCategories.js');
var getAuctions = require('./searchAuctions.js');
// var getOptions = require('./getAuction.js');
app.get('/categories', getCategories.listCategories);
app.get('/sellers', getSellers.listSellers);
app.get('/auctions', getAuctions.searchAuctions);
// app.get('/auction', getAuction.getAuction);

console.log("HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY HEY");