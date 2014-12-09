/*
   ##########################################################
   ##########                                      ##########
   ##########      SERVIDOR HTTP RASPBERRY PI      ##########
   ##########                                      ##########
   ##########################################################
*/



/************** MÒDULS **************/

var http = require('http');
var url = require('url');
var fs = require('fs');
var ip = require('ip');
var stdio = require('stdio');
var PythonShell = require('python-shell');


/************** ARGUMENTS DEL SERVIDOR **************/

var opcionsNode = stdio.getopt({
  'port': {
    key: 'p',
    description: 'Port del servidor (4444 per defecte)',
    args: 1
  },
  'metode': {
    key: 'm',
    description: 'Pot ser Get o Post',
    mandatory: true,
    args: 1
  },
  'log': {
    key: 'l',
    description: 'Log de les connexions',
    args: 1
  }
});


/************** INICIALITZACIÓ **************/

var form = (opcionsNode.metode.toLowerCase() == "get") ?
            fs.readFileSync('formGet.html') :
            fs.readFileSync('formPost.html');

var ipActual = "";
var requestActual = "";

var opcionsPython = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  scriptPath: '/home/pi/WWW_ArduinoRele_Raspi'
};

process.on('SIGINT', function(){
  pyshell.send('e');
  console.log("\nServidor desconnectat.");
});


/************** MÈTODES **************/

function creaServer(port, metode){
  iniciaControlador();

  server = (metode.toLowerCase() == "get") ? serverGet : serverPost;

  server.listen(parseInt(port), function(){
    console.log("Servidor en marxa! -> " + ip.address()
    + ":" + port + "  Mètode: " + metode + '\n');
  });
}

function iniciaControlador(){
  pyshell = new PythonShell('controlador.py', opcionsPython);
}

function recuperaIP(request){
  var ip = request.connection.remoteAddress;
  console.log("Client connectat -> " + ip);
  var data = new Date().toString();
  console.log(data);

  if(opcionsNodeNode.log != undefined)
    escriuLog(ip, data);

  ipActual = ip;
  reqActual = request;

  return ip;
}

function escriuLog(ip, data){
  fs.appendFile(opcionsNode.log + '.log', ip + " -> " + data + '\n', function(err){
    if(err)
      console.log("Error en escriure el log -> " + err);
  });
}


/************** TIPUS DE SERVIDORS **************/

var serverGet = http.createServer(function(request, response){
  if(requestActual != request &&
          ipActual != request.connection.remoteAddress)
    recuperaIP(request);

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(formGet);

  var query = url.parse(request.url, true).query;
  var variableget = query.opcio;

  if(variableget != undefined){
    variableget += '\n';
    console.log("\nVariable get: " + variableget);
    pyshell.send(variableget);
  }
});

var serverPost = http.createServer(function(request, response){
  recuperaIP(request);

  if(request.method == "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(formPost);
  }
});


/************** INICI DEL PROGRAMA **************/

if(opcionsNode.port != undefined)
  creaServer(opcionsNode.port, opcionsNode.metode);
else
  creaServer(4444, opcionsNode.metode);
