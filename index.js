// console.log('Hello world 3');
const path = require('path')
const express = require('express');
const app =express();




//settings
app.set('port', process.env.PORT || 5000);

//static files

app.use(express.static(path.join(  __dirname ,'public')));


//start server
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
})

const SocketIO = require ('socket.io');
const io = SocketIO(server);

//websockets

io.on('connection',(socket)=>{
    console.log('new connection', socket.id);

    socket.on('asesor:message',(dataAsesor)=>{
        console.log(dataAsesor);
        // io.sockets.emit('asesor:message',data) //envia a todos incluyendome
        socket.broadcast.emit('asesor:message',dataAsesor);
    })
    socket.on('cliente:message',(dataCliente)=>{
        console.log(dataCliente);
        // io.sockets.emit('asesor:message',data) //envia a todos incluyendome
        socket.broadcast.emit('cliente:message',dataCliente);
    })
})