var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    b=require('bonescript');

app.listen(8000);


function handler(req, res) {
    fs.readFile('index.html', function(err, data) {
        if (err) {
      //Si hay error, mandaremos un mensaje de error 500
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}


io.sockets.on('connection', function(socket) {
    
    function lectura()
    {
        
        var adcPin="P9_36";
        var adcValue=0;
        
        adcValue=b.analogRead(adcPin);
        console.log(adcValue);
        var date = new Date().getTime();
        socket.emit('temperatureUpdate', date, adcValue);
    }
    setInterval(lectura, 5000);

});
