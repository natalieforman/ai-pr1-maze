//Global variables for the booleans
var bool = false;
var wall_bool = false; //if true you loose
//Calling this function when the user mouseovers any of the walls, if the user leaves the wall then I call the leaveWall function
function lose(event) {
    wall_bool = true;
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].classList.remove("wall");
        wall[i].classList.add("wallMouse");
    }
    var mountain = document.querySelectorAll(".mountain");
    for (var i = 0; i < mountain.length; i++) {
        mountain[i].classList.remove("mountain");
        mountain[i].classList.add("badMountain");
    }
}

//calling this function when the user wins the game and makes it to the finish tile
function win(event) {
  var output = document.getElementById("output");
  output.innerHTML = "You Win";
}

//this function is called when the user finishes the game but went through a wall
function winUnsuccessful(event) {
    var gem = document.querySelectorAll(".gem");
    var gemClick = document.querySelectorAll(".gemClick");
    var sandalsClick = document.querySelectorAll(".sandalsClick");
    var sandals = document.querySelectorAll(".sandals");
    var hades = document.querySelectorAll(".hades");
    var hadesClick = document.querySelectorAll(".hadesClick");
    //console.log(hadesClick);
    //console.log(hades);
    if (gem.length != 0 | gemClick.length != 0) {
        var output = document.getElementById("output");
        output.innerHTML = "You aren't invisible and cannot walk through walls: Win Unsuccessful";
      //  alert("You aren't invisible and cannot walk through walls: Win Unsuccessful");
    } else if (sandals.length != 0 | sandalsClick != 0) {
        var output = document.getElementById("output");
        output.innerHTML ="You hit some mountains and experienced some bruises: Win Unsuccessful";
        //alert("You hit some mountains and experienced some bruises: Win Unsuccessful");
    } else if (hades.length != 0 | hadesClick.length != 0) {
        //alert("You got badly burned by the flames: Win Unsuccessful");
        var output = document.getElementById("output");
        output.innerHTML = "You got badly burned by the flames: Win Unsuccessful";
    }
}

//calling this when the user reaches the finish without first completing the task
function winTask(event) {
  var output = document.getElementById("output");
  output.innerHTML = "You need to finish a task before completing the maze";
}

//Calling this function when the user leaves the game area
function endGame(event) {
  var bounds = document.getElementById("bounds");
  bounds.innerHTML = "You are out of bounds";
  console.log("out of bounds");
    //alert("You left the game and are out of bounds");
}

//this function is called when the user falls through the sky tiles without sandals or is killed by the minotour
function diedGame(event) {
    var gem = document.querySelectorAll(".gem");
    var sandals = document.querySelectorAll(".sandals");
    if (gem.length != 0) {
      var output = document.getElementById("output");
      output.innerHTML = "The evil minotour captured you";
    } else if (sandals.length != 0) {
      console.log(sandals);
      alert("no shoes");
      var output = document.getElementById("output");
      output.innerHTML = "Oh no!! You didn't pick up the shoes from Hermes and you can't fly";
    }
}

//Calling this function when the user first hovers over the start
function startGame(event) {
    var start = document.querySelectorAll(".start");
    start[0].classList.remove("start");
    start[0].classList.add("startMouse");
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].onmouseover = lose;
    }
    var mountain = document.querySelectorAll(".mountain");
    for (var i = 0; i < mountain.length; i++) {
        mountain[i].onmouseover = lose;
    }
}

//Calling this function when the user is not hovering over the start
function continueGame(event) {
    var tiles = document.getElementById("game").children;
    tiles[0].classList.remove("startMouse");
    tiles[0].classList.add("start");
}

//This function will be called when the user picks up an item, once a user has picked up an item they can then complete the task
function pickupItem(event) {
    bool = true;
    var gem = document.querySelectorAll(".gem");
    var key = document.querySelectorAll(".key");
    var sandals = document.querySelectorAll(".sandals");
    var altar = document.querySelectorAll(".altar");
    var message = document.querySelectorAll(".message");
    var hades = document.querySelectorAll(".hades");
    var finish = document.querySelectorAll(".finish");
    if (gem.length != 0) {
        gem[0].classList.remove("gem");
        gem[0].classList.add("gemClick");
    } else if (key.length != 0) {
        key[0].classList.remove("key");
        key[0].classList.add("keyClick");
        if (wall_bool === false) { //once the user gets the key they can win without ever seeing hades
            finish[0].onmouseover = win;
        } else if (wall_bool === true) {
            finish[0].onmouseover = winUnsuccessful;
        }
    } else if (sandals.length != 0) {
        sandals[0].classList.remove("sandals");
        sandals[0].classList.add("sandalsClick"); //once you have clicked on the sandals you can now click on the message
        message[0].onclick = dropoffItem;
    }
}

//this function will be called when the user drops off an item, this function can only be reached once you pick up an item
function dropoffItem(event) {
    var finish = document.querySelectorAll(".finish");
    var altar = document.querySelectorAll(".altar");
    var message = document.querySelectorAll(".message");
    if (altar.length != 0) {
        if (bool === false) {
            diedGame();
        } else if(bool === true) {
            altar[0].classList.remove("altar");
            altar[0].classList.add("altarClick");
            var output = document.getElementById("output");
            output.innerHTML = "You have successfully killed the evil Minotour";
            //once you have killed the Minotour now you can win the game but only if you did not hit any walls
            if (wall_bool === false) {
                finish[0].onmouseover = win;
            } else if (wall_bool === true) {
                finish[0].onmouseover = winUnsuccessful;
            }
        }
    } else if (message.length != 0) {
        message[0].classList.remove("message");
        message[0].classList.add("messageClick");
        if (wall_bool === false) {
            finish[0].onmouseover = win;
        } else if (wall_bool === true) {
            finish[0].onmouseover = winUnsuccessful;
        }
    }
}
//this function is special to the sky tiles, because if the user touches the sky tiles without first getting the sandals they automatically die
function skyTiles(event) {
    if (bool === false) {
        diedGame();
    }
}
//This function is just for hades because hades can appear even if a key is not picked up, the other items must be picked up before they get dropped off
function hadesAppears(event) {
    var finish = document.querySelectorAll(".finish");
    var hades = document.querySelectorAll(".hades");
    if (hades.length != 0) {
        if (bool === false) {
            hades[0].classList.remove("hades");
            hades[0].classList.add("hadesClick");
            alert("Evil Hades has captured you");
        } else if (bool === true) {
            hades[0].classList.remove("hades");
            hades[0].classList.add("hadesClick");
            alert("You did not die from the evil hades");
            if (wall_bool === false) {
                finish[0].onmouseover = win;
            } else if (wall_bool === true) {
                finish[0].onmouseover = winUnsuccessful;
            }
        }
    }
}

//This function is the play function and it is being called in the parser.js file once the board is created
function play() {
    var output = document.getElementById("output");
    var text = document.getElementById("output").innerHTML;
    if(text.length != 0){
      var output = document.getElementById("output");
      output.innerHTML = ""; //clearing the text in the output when the user switches levels
    }
    var gem = document.querySelectorAll(".gem");
    var altar = document.querySelectorAll(".altar");
    var start = document.querySelectorAll(".start");
    var game = document.getElementById('game');
    var hades = document.querySelectorAll(".hades");
    var sky = document.querySelectorAll(".sky");
    var sandals = document.querySelectorAll(".sandals");
    var key = document.querySelectorAll(".key");
    var finish = document.querySelectorAll(".finish");
    var message =  document.querySelectorAll(".message");
    //all of the user mouse functions being called here
    start[0].onmouseover = startGame;
    start[0].onmouseleave = continueGame;
    finish[0].onmouseover = winTask;
    game.onmouseleave = endGame;
    if (gem.length != 0 && altar.length != 0) {
        gem[0].onclick = pickupItem;
        altar[0].onmouseover = dropoffItem;
    } else if (message.length != 0 && sandals.length != 0) {
        sandals[0].onclick = pickupItem;
        for (var i = 0; i < sky.length; i++) {
            sky[i].onmouseover = skyTiles;
        }
    } else if (hades.length != 0 && key.length != 0) {
        key[0].onclick = pickupItem;
        hades[0].onmouseover = hadesAppears;
    }
}
