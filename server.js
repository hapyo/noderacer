/*!
 * Noderacer
 * Copyright(c) 2016 JinWook Jeong <happygrammer.dev@gmail.com>
 * MIT Licensed
 */

/*
 * Noderacer server setting
 */
GLOBAL.NODERACER ={
             NAME:'Noderacer framework',
             VERSION:'0.1',
             RELEASE_DATE:'2015-05-13',
             PORT:3000
};




/*
 *  Do not modify the code below
*/
var app = require('./system/app');
app.set('port', process.env.PORT || GLOBAL.NODERACER.PORT);

var debug = require('debug')('m2');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
GLOBAL.R ={
              WAIT:2,
              TRUE:1,
              FALSE:0,
              ERR:-1,
              NOTFOUND:-2              
};
if (cluster.isMaster) {
    console.log('\nNoderacer v'+NODERACER.VERSION+" Port on 3000\n");
    
    // Fork workers
    for (var i = 0; i < 1; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}

if (!cluster.isMaster) {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
    var socketio = require('socket.io');
    var io = socketio.listen(server);
    io.sockets.on('connection', function(socket) {        
        socket.on('message', function(data) {           
            io.sockets.emit('message', data);
        });

    });
}