const req = require('express/lib/request');
const res = require('express/lib/response');
const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soccerndb'
});

connection.connect((err) =>{
    if(err) throw err;

    console.log("connected to MySQL!");
});
//ejemplo que sirve para que el server guarde la informacion a MYSQL

var services = function(app){
    app.post("/write-record", function(req, res){
        console.log("in write SQL")
        var data = {
            league_name: req.body.league_name,
            league_country: req.body.league_country
        };

        connection.query("INSERT INTO leagues SET ?", data, function(err, results) {
            if(err){
                return res.status(201).send(JSON.stringify({msg: "ERROR:" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
            }

        })
    });

    app.post("/create_player", function(req, res){
        console.log("in write SQL")

        var data = {
            player_name: req.body.player_name,
            player_position: req.body.player_position,
            team_id: req.body.team_id,
            position_x: req.body.position_x,
            position_y: req.body.position_y,
            
        };

        connection.query("INSERT INTO players SET ?", data, function(err, results) {
            if(err){
                return res.status(201).send(JSON.stringify({msg: "ERROR:" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
            }

        })
    });

    app.get('/read-records', function(req,res){
        //console.log(req);
        connection.query("SELECT * FROM leagues", function(err, rows){     //change later on to the proper soccer value
            if(err){
                return res.status(201).send(JSON.stringify({msg: "ERROR: " + err}));
            } else{
                console.log("data: " + JSON.stringify(rows));
                return res.status(201).send(JSON.stringify({msg: "SUCCESS", leagues:rows}));
            }
        }); 
    });

    app.get('/read-teams', function(req,res){
        //console.log(req);
        connection.query("SELECT * FROM teams", function(err, rows){    
            if(err){
                return res.status(201).send(JSON.stringify({msg: "ERROR: " + err}));
            } else{
                console.log("data: " + JSON.stringify(rows));
                return res.status(201).send(JSON.stringify({msg: "SUCCESS", teams:rows}));
            }
        }); 
    });


    app.post("/add_team", function(req, res){
        console.log("in write SQL")
        var data = {
            team_name: req.body.team_name,
            league_id: req.body.Select_League
        };

        connection.query("INSERT INTO teams SET ?", data, function(err, results) {
            if(err){
                return res.status(201).send(JSON.stringify({msg: "ERROR:" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
            }

        })
    });
    
    app.get('/read-players', function(req,res){
    //console.log(req);
    connection.query( `SELECT * FROM players WHERE team_id = ${req.body.team_id}`, function(err, rows){    
        if(err){
            return res.status(201).send(JSON.stringify({msg: "ERROR: " + err}));
        } else{
            console.log("data: " + JSON.stringify(rows));
            return res.status(201).send(JSON.stringify({msg: "SUCCESS", players:rows}));
        }
    }); 
});
};



module.exports = services;

