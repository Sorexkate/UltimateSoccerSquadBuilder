
//create listener that waits for the user to hit the submit button
console.log('line 3')
$('#data-submit').click(function(event){
    event.preventDefault();

    var  league_name = $('#league_name').val();
    var  league_country = $('#league_country').val();
    var  leagueLogo = $('leagueLogo').val();

    var jsonString = {league_name: league_name, league_country: league_country,leagueLogo: leagueLogo};
    
    $.ajax({
        url: 'http://localhost:3000' + "/write-record",
        type: "post",
        data: jsonString,
        success: function(response){
             var test1 = "";
             alert(response)
        },
        error: function(err){
            var test2 = "";
            alert(err)
        }
    });
    return false;
});

//listener for the Teams
$('#team-submit').click(function(){

    var  team_name = $('#team_name').val();
    var  Select_League = $('#Select_League :selected').val();
   console.log(Select_League);
    var jsonString = {team_name: team_name, Select_League: Select_League};
    
    $.ajax({
        url: 'http://localhost:3000' + "/add_team",
        type: "post",
        data: jsonString,
        success: function(response){
             var test1 = "";
             alert(response)
        },
        error: function(err){
            var test2 = "";
            alert(err)
        }
    });
    return false;
});


//listener for submiting a player

$('#player_form').submit(function(event){
event.preventDefault();
    var  player_name = $('#player_name').val();
    var  player_position = $('#player_position option').filter(':selected').val();
    var  team_id = $('#team_id option').filter(':selected').val();
    console.log(team_id)

    var pos_x = '';
    var pos_y = '';
        switch (player_position) {
                case "GK":
                    pos_x = '50';
                    pos_y = '95';
                    break;
                case "DR":
                    pos_x = '85';
                    pos_y = '75';
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

    var jsonString = {player_name: player_name, player_position: player_position,team_id: team_id,
        position_x: pos_x,
        position_y: pos_y};
    
    $.ajax({
        url: 'http://localhost:3000' + '/create_player',
        type: "post",
        data: jsonString,
        success: function(response){
             var test1 = "";
             alert(response)
        },
        error: function(err){
            var test2 = "";
            alert(err)
        }
    });
    return false;
});


//listener for showing a dinamic select for leagues
function select_leagues(){
    
      $.ajax({type: "GET",
          url: 'http://localhost:3000' + '/read-records',
          success:function(result){
             data = JSON.parse(result) 
             console.log(data);
             console.log(data.leagues.length);
             var htmlString = "<label for = 'league_name'> League: </label><select id='Select_League'> <option value=''>Choose a League </option>";
               
                    
               
           for(item =0; item <data.leagues.length;item++){
               console.log(item);
            // $("#Select_League").append('<option value='+data[item].id+'>'+data[item].name+'</option>');
            htmlString +="<option value='" + data.leagues[item].id+"'>"+data.leagues[item].league_name+"</option>"
           }
           htmlString += " </select>"
           console.log(htmlString);

        $("#league_dropdown").html(htmlString);
        },
         error:function(result)
          {
          alert('error');
         }
     });
};
select_leagues();

//listener for showing a dinamic select for team
function select_team(){
    
      $.ajax({type: "GET",
          url: 'http://localhost:3000' + '/read-teams',
          success:function(result){
              console.log(result);
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