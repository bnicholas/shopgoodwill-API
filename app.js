var express = require('express');
var path    = require('path');
var app     = express();
var port    = process.env.PORT || 5000;
var os      = require('os');

app.listen(port, function() { console.log("Listening on " + port) });

var getSellers    = require('./getSellers.js');
var getCategories = require('./getCategories.js');
var getAuctions   = require('./getAuctions.js');
var getItem  = require('./getItem.js');

app.get('/categories', getCategories.listCategories);
app.get('/sellers', getSellers.listSellers);
app.get('/auctions', getAuctions.listAuctions);
app.get('/item', getItem.showAuction);
