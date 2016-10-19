var time_end,
    time_start;

function lose(event) {
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].classList.remove("wall");
        wall[i].classList.add("wallMouse");
    }
}
function regular(event) {
    console.log("you cannot walk through walls");
    loser = true;
    var tile = document.querySelectorAll(".free ");
    for (var i = 0; i < tile.length; i++) {
        tile[i].classList.remove("tile");
        tile[i].classList.add("walking");
        console.log("just walking the game");
    }
}
function win(event) {
    time_end = new Date();
    alert("You Win");
    return time_end;
}
//Calling this function when the user leaves the game area
function endGame(event) {
    time_end = new Date();
    alert("You Left the Game");
    return time_end;
}
//Calling this function when the user first hovers over the start
function startGame(event) {
    //timer function begins
    time_start = new Date();
    var start = document.querySelectorAll(".start");
    //console.log(start);
    start[0].classList.remove("start");
    start[0].classList.add("startMouse");
    var finish = document.querySelectorAll(".finish");
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].onmouseover = lose;
        wall[i].onmouseleave = leaveWall;
    }
    return time_start;
}
//Calling this function when the user is not hovering over the start
function continueGame(event) {
    var tiles = document.getElementById("game").children;
    tiles[0].classList.remove("startMouse");
    tiles[0].classList.add("start");
}
//Calling this function when the user is not hovering over the walls
function leaveWall(event) {
    var tiles = document.getElementById("game").children;
    var wall_array = [];
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].className == "tile wallMouse") {
            wall_array.push(tiles[i]);
        }
    }
    for (var i = 0; i < wall_array.length; i++) {
        wall_array[i].classList.remove("wallMouse");
        wall_array[i].classList.add("wall");
    }
}
//This function will be called when the user picks up the item
function pickupItem(event) {
    var gem = document.querySelectorAll(".gem");
    console.log(gem);
    gem[0].classList.remove("gem");
    gem[0].classList.add("gemClick");
}

//this function will be called when the user drops off an item
function dropoffItem(event) {
    var altar = document.querySelectorAll(".altar");
    console.log(altar);
    altar[0].classList.remove("altar");
    altar[0].classList.add("altarClick");
}
function play() {
    var tiles = document.getElementById("game").children;
    var tile = document.querySelectorAll(".tile");
    var wall = document.querySelectorAll(".wall");
    var gem = document.querySelectorAll(".gem");
    var altar = document.querySelectorAll(".altar");
    var start = document.querySelectorAll(".start");
    var finish = document.querySelectorAll(".finish");
    var game = document.getElementById('game');
    //console.log(tile);
    //console.log(altar);
    //console.log(wall);
    //console.log(start);

    //all of the user mouse functions being called here
    start[0].onmouseover = startGame;
    start[0].onmouseleave = continueGame;
    gem[0].onclick = pickupItem;
    altar[0].onclick = dropoffItem; //this can only happen if the user first picked up the gem
    game.onmouseleave = endGame;
    finish[0].onmouseover = win;
}

//This function will be for the timer
function timer(end, start) {
    difference = (start - end);
    days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
    years = Math.floor(days / 365);
    if (years > 1) {
        days = days - (years * 365)
    }
    hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
    mins = Math.floor(((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
    secs = Math.floor((((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
    document.getElementById('years').innerHTML = years;
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = mins;
    document.getElementById('seconds').innerHTML = secs;
}
timer(time_end, time_start);
