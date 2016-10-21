var time_end,
    time_start;
//Calling this function when the user mouseovers any of the walls
function lose(event) {
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

//Calling this function when the user mouseovers the regular free tiles
function walk(event) {
    console.log("Walking");
    var tile_array = [];
    var tile = document.querySelectorAll(".tile");
    for (var i = 0; i < tile.length; i++) {
        if (tile[i].className == "tile ") {
            tile_array.push(tile[i]);
            console.log(tile[i]);
        }
    }
    for (var i = 0; i < tile_array.length; i++) {
        //check if mouse on current i
        var x = event.clientX;
        var y = event.clientY;
        tile_array[i].classList.add("tileMouse");
    }
}

function leaveTile(event) {
    var tile_array = [];
    var bool = true;
    var tile = document.getElementById("game").children;
    console.log(tile);
    for (var i = 0; i < tile.length; i++) {
        if (tile[i].className == "tile tileMouse") {
            tile_array.push(tile[i]);
        } else if (tile[i].className == "tile tileLeave") {
            tile_array.push(tile[i]);
            bool = false
        }
    }
    for (var i = 0; i < tile_array.length; i++) {
        if (bool === true) {
            tile_array[i].classList.remove("tileMouse");
            tile_array[i].classList.add("tileLeave");
        } else {
            tile_array[i].classList.remove("tileLeave");
            tile_array[i].classList.add("tileMouse");
        }
    }
}

//calling this function when the user wins the game and makes it to the finish tile
function win(event) {
    time_end = new Date();
    //alert("You Win");
    return time_end;
}

//Calling this function when the user leaves the game area
function endGame(event) {
    time_end = new Date();
    //alert("You left the game and are out of bounds");
    return time_end;
}

//Calling this function when the user first hovers over the start
function startGame(event) {
    //timer function begins
    time_start = new Date();
    var start = document.querySelectorAll(".start");
    var tile_array = [];
    //console.log(start);
    start[0].classList.remove("start");
    start[0].classList.add("startMouse");
    //if the user walks over a wall
    var wall = document.querySelectorAll(".wall");
    for (var i = 0; i < wall.length; i++) {
        wall[i].onmouseover = lose;
        wall[i].onmouseleave = leaveWall;
    }
    var mountain = document.querySelectorAll(".mountain");
    for (var i = 0; i < mountain.length; i++) {
        mountain[i].onmouseover = lose;
        mountain[i].onmouseleave = leaveWall;
    }
    //if a user walks over a regular tile
    var tile = document.querySelectorAll(".tile");
    //console.log(tile);
    for (var i = 0; i < tile.length; i++) {
        if (tile[i].className == "tile ") {
            //console.log(tile[i]);
            tile_array.push(tile[i]);
        }
    }
    for (var i = 0; i < tile_array.length; i++) {
        tile_array[i].onmouseover = walk;
        //  tile_array[i].onmouseleave = leaveTile;
    }
    return time_start;
}

//Calling this function when the user is not hovering over the start
function continueGame(event) {
    var tiles = document.getElementById("game").children;
    tiles[0].classList.remove("startMouse");
    tiles[0].classList.add("start");
}

//This function will be called when the user picks up the item
function pickupItem(event) {
    var gem = document.querySelectorAll(".gem");
    var key = document.querySelectorAll(".key");
    var sandals = document.querySelectorAll(".sandals");
    //console.log(gem);
    if (gem.length != 0) {
        console.log("remove gem");
        gem[0].classList.remove("gem");
        gem[0].classList.add("gemClick");
    } else if (key.length != 0) {
        key[0].classList.remove("key");
        key[0].classList.add("keyClick");
        console.log("dude you just clicked the magic key");
    } else if (sandals.length != 0) {
        sandals[0].classList.remove("sandals");
        sandals[0].classList.add("sandalsClick");
        console.log("dude you just got cool sandals");
    }
}

//this function will be called when the user drops off an item
function dropoffItem(event) {
    var altar = document.querySelectorAll(".altar");
    var hades = document.querySelectorAll(".hades");
    var message = document.querySelectorAll(".message");
    //console.log(altar);
    if (hades.length != 0) {
        hades[0].classList.remove("hades");
        hades[0].classList.add("hadesClick");
        console.log("you just met hades");
    } else if (altar.length != 0) {
        altar[0].classList.remove("altar");
        altar[0].classList.add("altarClick");
    } else if (message.length != 0) {
        message[0].classList.remove("message");
        message[0].classList.add("messageClick");
    }
}

function play() {
    var tiles = document.getElementById("game").children;
    //  console.log(tiles);
    var tile = document.querySelectorAll(".tile");
    console.log(tile);
    for (var i = 0; i < tile.length; i++) {
        if (tile[i].className == "tile ") {}
    }
    var wall = document.querySelectorAll(".wall");
    var gem = document.querySelectorAll(".gem");
    var altar = document.querySelectorAll(".altar");
    var start = document.querySelectorAll(".start");
    var finish = document.querySelectorAll(".finish");
    var game = document.getElementById('game');
    var hades = document.querySelectorAll(".hades");
    var sky = document.querySelectorAll(".sky");
    var sandals = document.querySelectorAll(".sandals");
    var key = document.querySelectorAll(".key");
    var mountain = document.querySelectorAll(".mountain");
    var message = document.querySelectorAll(".message");

    //console.log(tile);
    //console.log(sky);
    //console.log(hades);
    //  console.log(key);
    //console.log(start);
    //all of the user mouse functions being called here
    start[0].onmouseover = startGame;
    start[0].onmouseleave = continueGame;
    game.onmouseleave = endGame;
    finish[0].onmouseover = win;
  // mailbox[0].onmouseover = win;
    if (gem.length != 0 && altar.length != 0) {
        gem[0].onclick = pickupItem;
        altar[0].onclick = dropoffItem;
    } else if (sky.length != 0 && sandals.length != 0) {
        //sky[0].onclick = pickupItem;
        sandals[0].onclick = pickupItem;
        message[0].onclick = dropoffItem;
        console.log("sky sandals and message");

    } else if (hades.length != 0 && key.length != 0) {
        hades[0].onmouseover = dropoffItem;
        key[0].onclick = pickupItem;
        console.log("evil hades and a key");
    }
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
//timer(time_end, time_start);
