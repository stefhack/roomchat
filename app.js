
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
;

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'));

console.log('Express server listening on port ' + app.get('port'));

var io=require('socket.io').listen(server);

io.sockets.on('connection',function(socket){


/***********Reception du pseudo***************/
    socket.on('pseudo',function(data){
        console.log(data+" est maintenant connecté");
        socket.broadcast.emit('new',data+" est maintenant connecté");
        socket.set('pseudo',data);
    });

    /**********recception de la couleur*************/
    socket.on('couleur',function(data){
        socket.set('couleur',data);
    });

   socket.emit('connection',{data:'connecté'});

 socket.on('connection',function(data){
    console.log(' Message du client :' +data.test);

 });
/*********reception d'un message / Envoi à tous*************/
    socket.on('message',function(data){
        var pseudo,couleur;
         socket.get('pseudo',function(err,nick){
            pseudo=nick;
        });
        socket.get('couleur',function(err,coul){
            couleur=coul;
        });
        console.log("nouveau message :"+data.message);
  socket.broadcast.emit('newMsg',{pseudo:pseudo,message:data.message,couleur:couleur});
    });

    socket.on("drag",function(data){
        console.log("message du client :"+data);
    });
});

var cluster=require('cluster');
var numCpu= require('os').cpus.length;

console.log("Nb cpu = "+numCpu);
console.log("Plateforme :"+require('os').platform());
console.log('Master ? :'+ cluster.isMaster);

for(var i= 0; i<numCpu;i++){
    cluster.fork();
    console.log("num cpu = "+i);
}