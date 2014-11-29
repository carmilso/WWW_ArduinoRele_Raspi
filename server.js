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


/************** ARGUMENTS DEL SERVIDOR **************/

var opcions = stdio.getopt({
  'port': {
    key: 'p',
    description: 'Port del servidor',
    mandatory: true,
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

var formGet = fs.readFileSync('formGet.html');
var formPost = fs.readFileSync('formPost.html');

function creaServer(port, metode){
  server = (metode.toLowerCase() == "get") ? serverGet : serverPost;
  server.listen(parseInt(port), function(){
    console.log("Servidor en marxa! -> " + ip.address()
    + ":" + port + "  Mètode: " + metode + '\n');
  });
}


/************** MÈTODES **************/

function recuperaIP(request){
  var ip = request.connection.remoteAddress;
  console.log("Client connectat -> " + ip);
  var data = new Date().toString();
  console.log(data);

  if(opcions.log != undefined)
    escriuLog(ip, data);
}

function escriuLog(ip, data){
  fs.appendFile(opcions.log + '.log', ip + " -> " + data + '\n', function(err){
    if(err)
      console.log("Error en escriure el log -> " + err);
  });
}


/************** TIPUS DE SERVIDORS **************/

var serverGet = http.createServer(function(request, response){
  recuperaIP(request);

  if(request.method == "GET"){
    var query = url.parse(request.url, true).query;
    var variableget = query.variableget;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(variableget);
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

creaServer(opcions.port, opcions.metode);
