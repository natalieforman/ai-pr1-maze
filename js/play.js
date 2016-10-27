//Global variables for the booleans
var bool = false;
var wall_bool = false; //if true you loose

/*
Called when the user mouseovers any wall
@param {event} event - The wall, mountaisn or flames have been touched
 */
function lose(event) {
    //wall is wall and flames
    wall_bool = true;
    var wall = document.querySelectorAll(".wall");
    //since touched, display different image
    for (var i = 0; i < wall.length; i++) {
        wall[i].classList.remove("wall");
        wall[i].classList.add("wallMouse");
    }
    //since touched, display different image
    var mountain = document.querySelectorAll(".mountain");
    for (var i = 0; i < mountain.length; i++) {
        mountain[i].classList.remove("mountain");
        mountain[i].classList.add("badMountain");
    }
}

/*
Called when the user touches the finish successfully
@param {event} event - The finish has been touched
 */
function win(event) {
  var output = document.getElementById("output");
  output.innerHTML = "You Win";
  alert("You Win");
}

/*
Called when the user finishes but touched a wall on the way
@param {event} event - Finish touched
 */
function winUnsuccessful(event) {
    //check if the sword has been used
    var gem = document.querySelectorAll(".gem");
    //check that the sword was picked up?
    var gemClick = document.querySelectorAll(".gemClick");
    //
    var sandalsClick = document.querySelectorAll(".sandalsClick");
    //check if the sandals have been picked up
    var sandals = document.querySelectorAll(".sandals");
    //check if hades was found
    var hades = document.querySelectorAll(".hades");
    //
    var hadesClick = document.querySelectorAll(".hadesClick");
    if (gem.length != 0 | gemClick.length != 0) {
        var output = document.getElementById("output");
        output.innerHTML = "You aren't invisible and cannot walk through walls: Win Unsuccessful";
    } else if (sandals.length != 0 | sandalsClick != 0) {
        var output = document.getElementById("output");
        output.innerHTML ="You hit some mountains and experienced some bruises: Win Unsuccessful";
        console.log("hi", sandals.length);
        console.log(sandalsClick)
    } else if (hades.length != 0 | hadesClick.length != 0) {
        var output = document.getElementById("output");
        output.innerHTML = "You got badly burned by the flames: Win Unsuccessful";
    }
}

/*
Called when the user mouseovers finish but hasn't finished a task
@param {event} event - The finish has been touched
 */
function winTask(event) {
  var output = document.getElementById("output");
  output.innerHTML = "You need to finish a task before completing the maze";
}

/*
Called when the user leaves he game area
@param {event} event - The cursor left the game div
 */
function endGame(event) {
  var output = document.getElementById("output");
  output.innerHTML = "You are out of bounds";
  console.log("out of bounds");
}

/*
Called when the user touches sky without sandals or the minotaur without the sword
@param {event} event - The sky or minotaur has been touched
 */
function diedGame(event) {
    var gem = document.querySelectorAll(".gem");
    var sandals = document.querySelectorAll(".sandals");
    if (gem.length != 0) {
      var output = document.getElementById("output");
      output.innerHTML = "The evil minotour captured you";
    } else if (sandals.length != 0) {
      console.log(sandals);
      var output = document.getElementById("output");
      output.innerHTML = "Oh no!! You didn't pick up the shoes from Hermes and you can't fly";
    }
}

/*
Begins the game by hovering over start
@param {event} event - Start has been touched
 */
function startGame(event) {
    var start = document.querySelectorAll(".start");
    var gem = document.querySelectorAll(".gem");
    var altar = document.querySelectorAll(".altar");
    var hades = document.querySelectorAll(".hades");
    var sky = document.querySelectorAll(".sky");
    var sandals = document.querySelectorAll(".sandals");
    var key = document.querySelectorAll(".key");
    var message =  document.querySelectorAll(".message");
    var finish = document.querySelectorAll(".finish");
    start[0].classList.remove("start");
    start[0].classList.add("startMouse");
    finish[0].onmouseover = winTask;
    game.onmouseleave = endGame;
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].onmouseover = lose;
    }
    var mountain = document.querySelectorAll(".mountain");
    for (var i = 0; i < mountain.length; i++) {
        mountain[i].onmouseover = lose;
    }
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

/*
Called when the user has moused over start and is now playing
@param {event} event - Moved away from start
 */
function continueGame(event) {
    var tiles = document.getElementById("game").children;
    tiles[0].classList.remove("startMouse");
    tiles[0].classList.add("start");
}

/*
Called when the user picks up an item, once a user has picked up an item they can then complete the task
@param {event} event - Item clicked on
 */
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

/*
this function will be called when the user kills the Minotaur or clicks the message
@param {event} event - The Minotaur or message is successfully clicked on
 */
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

/*
special to the sky tiles, because if the user touches the sky tiles without first getting the sandals they automatically die
@param {event} event - Sky tile touched
 */
function skyTiles(event) {
    if (bool === false) {
        diedGame();
    }
}

/*
For hades because hades can appear even if a key is not picked up, the other items must be picked up before they get dropped off
@param {event} event - Hades touched
 */
function hadesAppears(event) {
    var finish = document.querySelectorAll(".finish");
    var hades = document.querySelectorAll(".hades");
    if (hades.length != 0) {
        if (bool === false) {
            hades[0].classList.remove("hades");
            hades[0].classList.add("hadesClick");
            //alert("Evil Hades has captured you");
            var output = document.getElementById("output");
            output.innerHTML = "Oh No!! You were captured by the Evil Hades";
          }
        } else if (bool === true) {
            hades[0].classList.remove("hades");
            hades[0].classList.add("hadesClick");
            //alert("You did not die from the evil hades");
            var output = document.getElementById("output");
            output.innerHTML = "You gave Hades the key and he spared your life";
            var output = document.getElementById("output");
            output.innerHTML = "Evil Hades has captured you";
        } else if (bool === true) {
            hades[0].classList.remove("hades");
            hades[0].classList.add("hadesClick");
            var output = document.getElementById("output");
            output.innerHTML = "You did not die from the evil hades";
            if (wall_bool === false) {
                finish[0].onmouseover = win;
            } else if (wall_bool === true) {
                finish[0].onmouseover = winUnsuccessful;
            }
        }
    }

/*
Play function and it is being called in the parser.js file once the board is create
 */
function play() {
    var output = document.getElementById("output");
    var text = document.getElementById("output").innerHTML;
    if(text.length != 0){
      var output = document.getElementById("output");
      output.innerHTML = ""; //clearing the text in the output when the user switches levels
    var bounds = document.getElementById("bounds");
    var textBounds = document.getElementById("bounds").innerHTML;
    if(textBounds.length != 0){
      var bounds = document.getElementById("bounds");
      bounds.innerHTML = ""; //clearing the text in the out of bounds when the user switches levels
    }
    var start = document.querySelectorAll(".start");
    //all of the variables
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
}
