retriveData();


function retriveData(){
    //use ajax to get data

    console.log("in retriveData")
    $.ajax({
        url: 'http://localhost:3000'+"/read-records",
        type: 'get',
        data: {league:''},
        success: function(response){
            console.log(response)
            var data = JSON.parse(response);
            if(data.msg === "SUCCESS"){
                console.log("data" + JSON.stringify(data.leagues));
          createLibraryTable(data.leagues);//change later on for players info
        } else{
            console.log(data.msg);
            }
        },
        error: function(err){
            alert(err);
        }
    });
} 

//function to move a player around
  $( function() {
    $( ".player" ).draggable({containment:".field"});
    
  } );
  


//info for the player

$('#player-submit').click(function(){

    var  player_name = $('#player_name').val();
    var  player_position = $("#player_position option:selected").val();
    var  team_id = ('#team_id option').filter(':selected').val();
     console.log(player_position);
    var pos_x = '';
        var pos_y = '';
        switch (player_position) {
            case "GK":
                pos_x = '50';
                pos_y = '95';
                break;
            case "RCB":
                pos_x = '70';
                pos_y = '80'; 
                break;
            case "CB":
                pos_x = '50';
                pos_y = '80';
                break;
            case "LCB":
                pos_x = '30';
                pos_y = '80';
                break;
            case "DR":
                pos_x = '85';
                pos_y = '75';
                break;
            case "DL":
                pos_x = '15';
                pos_y = '75';
                break;
            case "CML":
                pos_x = '15';
                pos_y = '50';
                break;
            case "CM":
                pos_x = '50';
                pos_y = '50';
                break;
            case "CMR":
                pos_x = '85';
                pos_y = '50';
                break;
            case "CF":
                pos_x = '50';
                pos_y = '25';
                break;
            case "ST":
                pos_x = '50';
                pos_y = '15';
                break;
            default:
                pos_x = '0';
                pos_y = '0';
                break;
                                }
    console.log(player_position,pos_x,pos_y);

    var jsonString = {player_name: player_name,team_id: team_id,
        position_x: pos_x,
        position_y: pos_y,
    player_position:player_position};   

    console.log(jsonString);

    $.ajax({
        url: 'http://localhost:3000' + "/create_player",
        type: "post",
        data: jsonString,
        success: function(response){
             var data = JSON.parse(response);
             if(data.msg === "SUCCESS"){
                 var pos_id ="#" + player_position;
                 $(pos_id).html(player_name);
             }
             alert(response)
        },
        error: function(err){
            var test2 = "";
            alert(err)
        }
    });
    return false;
});

//function to populate a team
function select_team(){
    
    $.ajax({type: "GET",
        url: 'http://localhost:3000' + '/read-teams',
        success:function(result){
           data = JSON.parse(result) 
           console.log(data);
           console.log(data.teams.length);
           var htmlString = "<label for = 'team_id'> team: </label><select id='team_id'> <option value=''>Choose a team </option>";
             
                  
             
         for(item =0; item <data.teams.length;item++){
             console.log(item);
      
          htmlString +="<option value='" + data.teams[item].id+"'>"+data.teams[item].team_name+"</option>"
         }
         htmlString += " </select>"
         console.log(htmlString);

      $("#team_dropdown").html(htmlString);
      },
       error:function(result)
        {
        alert('error');
       }
   });
};
select_team();

//traer jugadores por team id 
function get_player(){
    
    $.ajax({type: "GET",
        url: 'http://localhost:3000' + '/read-players',
        success:function(result){
           data = JSON.parse(result) 
           console.log(data);
           console.log(data.teams.length);
           var htmlString = "<label for = 'team_id'> team: </label><select id='team_id'> <option value=''>Choose a team </option>";
             
                  
             
         for(item =0; item <data.teams.length;item++){
             console.log(item);
      
          htmlString +="<option value='" + data.teams[item].id+"'>"+data.teams[item].team_name+"</option>"
         }
         htmlString += " </select>"
         console.log(htmlString);

      $("#team_dropdown").html(htmlString);
      },
       error:function(result)
        {
        alert('error');
       }
   });
};
select_team();