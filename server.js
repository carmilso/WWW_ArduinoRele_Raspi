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
<<<<<<< HEAD
  'metode': {
    key: 'm',
    description: 'Pot ser Get o Post',
    mandatory: true,
    args: 1
  },
=======
>>>>>>> master
  'log': {
    key: 'l',
    description: 'Log de les connexions',
    args: 1
  }
});


/************** INICIALITZACIÓ **************/

var ipActual = "";
var requestActual = "";
var estatPereta = '1';
var codiError = '0';

var opcionsPython = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  scriptPath: '/home/pi/WWW_ArduinoRele_Raspi'
};
<<<<<<< HEAD


/************** MÈTODES **************/

function creaServer(port, metode){
  iniciaControlador();

  server = (metode.toLowerCase() == "get") ? serverGet : serverPost;

  server.listen(parseInt(port), function(){
    console.log("Servidor en marxa! ->", ip.address()
    + ":" + port, "  Mètode:", metode + '\n');
  });
  

  process.on('SIGINT', function(){
    console.log("\nServidor desconnectat.");
    process.exit(0);
  });

  process.on('exit', function(code){
    acabaControlador();
    console.log("Codi de sortida:", code);
  });
}

function iniciaControlador(){
  pyshell = new PythonShell('controlador.py', opcionsPython);
  pyshell.on('error', function(error){
    codiError = 1;
    console.log("Error en la comunicació amb l'Arduino. Reiniciar el servidor.\n");
  });
}

=======


/************** MÈTODES **************/

function creaServer(port, metode){
  iniciaControlador();

  server = serverGet;

  server.listen(parseInt(port), function(){
    console.log("Servidor en marxa! ->", ip.address()
    + ":" + port + '\n');
  });


  process.on('SIGINT', function(){
    console.log("\nServidor desconnectat.");
    process.exit(0);
  });

  process.on('exit', function(code){
    acabaControlador();
    console.log("Codi de sortida:", code);
  });
}

function iniciaControlador(){
  pyshell = new PythonShell('controlador.py', opcionsPython);
  pyshell.on('error', function(error){
    codiError = 1;
    console.log("Error en la comunicació amb l'Arduino. Reiniciar el servidor.\n");
  });
}

>>>>>>> master
function acabaControlador(){
  pyshell.send('e\n');
  pyshell.end(0);
  console.log("Controlador desconnectat.");
}

function recuperaIP(request){
  var ip = request.connection.remoteAddress;
  console.log("Client connectat ->", ip);
  var data = new Date().toString();
  console.log(data + "\n");

  if(opcionsNode.log != undefined)
    escriuLog(ip, data);

  ipActual = ip;
  reqActual = request;

  return ip;
}

function escriuLog(ip, data){
  fs.appendFile(opcionsNode.log + '.log', ip + " -> " + data + '\n', function(err){
    if(err)
      console.log("Error en escriure el log ->", err);
  });
}

function dibuixaHtml(estat){
  var html = '<html>';
  html += '<head>';
  html += '<title> Servidor http Raspberry Pi </title>';
  html += '</head>';
  html += '<body>';
  html += '<img src="http://62.117.232.31:8081"/>';
  html += '<br><br> Estat de la pereta: ' + estat;
  html += '<div align="left">';
  html += '<form method=get>';
  html += '<br>';
  html += '<button type="submit" style="width:100px; height:35px" name=opcio value=0> Encendre';
  html += '<button type="submit" style="margin-left:20px; width:100px; height:35px" name=opcio value=1> Apagar';
  html += '</form>';
  html += '</div>';
  html += '</body>';
  html += '</html>';

  return html;
}


<<<<<<< HEAD
/************** SERVIDORS **************/

var serverGet = http.createServer(function(request, response){
  if(requestActual != request &&
          ipActual != request.connection.remoteAddress)
    recuperaIP(request);
  
  var query = url.parse(request.url, true).query;
  var variableget = query.opcio;

  if(variableget != undefined && codiError == 0){
    estatPereta = variableget;
    console.log(estatPereta);
    variableget += '\n';
    console.log("Variable get:", variableget);
    pyshell.send(variableget);
  }

  if(codiError == 1){
    response.writeHead(500, {'Content-Type': 'text/html'});
    response.end(dibuixaHtml("Error al connectar amb l'Arduino"));
    process.exit(1);
  }
  else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    var estat = (estatPereta == '0') ? "encesa" : "apagada";
    response.end(dibuixaHtml(estat));
  }

});


var serverPost = http.createServer(function(request, response){
  recuperaIP(request);
=======
/************** SERVIDOR **************/
>>>>>>> master

var serverGet = http.createServer(function(request, response){
  if(requestActual != request &&
          ipActual != request.connection.remoteAddress)
    recuperaIP(request);

  var query = url.parse(request.url, true).query;
  var variableget = query.opcio;

  if(variableget != undefined && codiError == 0){
    estatPereta = variableget;
    console.log(estatPereta);
    variableget += '\n';
    console.log("Variable get:", variableget);
    pyshell.send(variableget);
  }

  if(codiError == 1){
    response.writeHead(500, {'Content-Type': 'text/html'});
    response.end(dibuixaHtml("Error al connectar amb l'Arduino"));
    process.exit(1);
  }
  else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    var estat = (estatPereta == '0') ? "encesa" : "apagada";
    response.end(dibuixaHtml(estat));
  }
<<<<<<< HEAD
=======

>>>>>>> master
});


/************** INICI DEL PROGRAMA **************/

console.log("Iniciant servidor...");

if(opcionsNode.port != undefined)
  creaServer(opcionsNode.port, opcionsNode.metode);
else
  creaServer(4444, opcionsNode.metode);
