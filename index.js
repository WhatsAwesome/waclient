var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
//  console.log(req);
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  GLOBAL.scket = socket;
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
(function myLoop (i) {          
   setTimeout(function () {   
      GLOBAL.scket.emit('chat message','message');
      if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 3000)
})(10); 

  socket.on('chat message', function(msg){
//    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

