var http = require('http');
var fs = require('fs');
var ip = require('ip');

var form = fs.readFileSync('form.html');

http.createServer(function(request, response){
  if(request.method == "GET"){
    console.log("Client connectat -> " + request.connection.remoteAddress);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(4444, function(){
  console.log("Servidor en marxa! -> " + ip.address() + '\n');
})
