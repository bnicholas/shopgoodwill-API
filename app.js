var express = require('express');
var path    = require('path');
var app     = express();
var port    = process.env.PORT || 8080;
var os      = require('os');

var getSellers    = require('./getSellers.js');
var getCategories = require('./getCategories.js');
var getAuctions   = require('./getAuctions.js');
var getItem       = require('./getItem.js');

var cors = require('cors');
app.use(cors());

app.get('/', getAuctions.listAuctions);
app.get('/auctions', getAuctions.listAuctions);
app.get('/categories', getCategories.listCategories);
app.get('/item', getItem.showAuction);
app.get('/sellers', getSellers.listSellers);

app.listen(port, function() { console.log("Listening on " + port) });
