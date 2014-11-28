//Controlar pereta

var http = require('http');
var fs = require('fs');
var ip = require('ip');

var form = fs.readFileSync('form.html');

http.createServer(function(request, response){
  var ip = request.connection.remoteAddress;
  console.log("Client connectat -> " + ip);
  var data = new Date().toString();
  console.log(data);

  fs.appendFile('server.log', ip + " -> " + data + '\n', function(err){
    if(err)
      console.log("Error en escriure el log -> " + err);
  });

  if(request.method == "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(4444, function(){
  console.log("Servidor en marxa! -> " + ip.address() + '\n');
})
