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

// if ENV["RUNNING_ON"] == "heroku"
//   # feed_yamlizer calls the tidy binary directly; heroku needs special support.
//   ENV["PATH"] = "/app/lib/tidy/bin/:#{ENV['PATH']}"
//   ENV["LD_LIBRARY_PATH"] ||="/usr/lib"
//   ENV["LD_LIBRARY_PATH"] +=":/app/lib/tidy/lib"
// end

// heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs

// config:add PATH=vendor/tidy/bin:/usr/bin:/bin
// Setting config vars and restarting severe-water-5643... done, v6
// PATH: vendor/wget/bin:/usr/bin:/bin