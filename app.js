
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


/*
 var cluster=require('cluster');
 var numCPUs=require('os').cpus().length;
if(cluster.isMaster){
    for(var i=0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',function(w,c,sign){
       console.log('worker '+worker.process.pid+' died');
    });
}
else{

}
*/
server.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));

var io=require('socket.io').listen(server);

/****Config PROD**
io.configure(function(){
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
    io.set('log level',3);
    io.set('heartbeat interval',15);
    io.set('polling duration',10);
    io.set('transports',['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling']);
});
 */

//io.set('sync disconnect on unload',false);

//var allRooms=[];

io.sockets.on('connection',function(socket){


  /*  socket.on('room',function(data){
        socket.set('room',data.name);
        allRooms.push(data.name);
        for(var room in allRooms){
            console.log(allRooms[room]);
        }
        console.log("Room :"+data.name);
    });

*/
/********Ardoise********/
socket.on('ardoise_start',function(data){
    socket.broadcast.emit('ardoise_start',{painting:data.painting,X:data.X,Y:data.Y});
console.log('Start ardoise...');
    console.log('X :'+data.X+'  Y :'+data.Y);
});


    socket.on('ardoise_move',function(data){
       socket.broadcast.emit('ardoise_move',{painting:data.painting,X:data.X,Y:data.Y});
        console.log('ardoise_move');
    });

    socket.on('ardoise_end',function(data){
        socket.broadcast.emit('ardoise_end',{end:true});
        console.log('ardoise fin ....');
    });
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


/****Ecriture live****/
    socket.on("textLive",function(data){
        console.log('envoyé :'+data.text);
            socket.broadcast.emit('text',{text:data.text});
    });


/*****Deconnection*******/
    socket.on('disconnect',function(){

        socket.get('pseudo',function(err,pseudo){
            if(pseudo != null){
                socket.broadcast.emit('disconnect',
                    {user:pseudo});
            }

        });

    });


});//On Connection

