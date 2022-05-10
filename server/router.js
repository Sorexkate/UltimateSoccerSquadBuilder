const path = require('path');

//Page listenters 

//Cambia de nuevo la primera pagina en /client/
var router = function(app){
    app.get('/', function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../client/paginaPrincipal.html"));
    });

    app.get("/adminPage", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../client/adminPage.html"));
    });

    app.get("/browsePlayers", function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../client/browsePlayers.html"));
    });

    app.get("/paginaPrincipal", function(req,res){
        res.status(200).sendFile(path.join(__dirname + "/../client/paginaPrincipal.html"));
    });


}


module.exports = router;