var forever = require('forever-monitor');

var foreverOpt = {
  // max: 10,
  killTree: true,
  silent: false,
  minUptime: 1000,
  sourceDir: '/',
  watch: true,
  logFile: '/logs'
}

var child = new (forever.Monitor)('app.js', foreverOpt);

child.on('watch:restart', function(info) {
    console.log('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    console.log('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    console.log('Forever detected script exited with code ' + code);
});

child.start();