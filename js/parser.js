var start,
    finish,
    gridwidth;
var objects = [];
var openFile = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        //console.log(typeof reader.result); double checking that this is a string
        //now with our text we need to parse the string
        var new_text = text.split(/[()]+/); //this splits the strings by the parentheses
        console.table(new_text);
        var size = printGrid(new_text);
        var startPos = findStart(new_text);
        /*in this part of the parsing I am splicing the array at the completed text, since all of the level_design coordinates listed for the wall, touch, gem and altar are the same as the previous coordinates. This will prevent any redrawing of a tile*/
        var splicelocation = new_text.indexOf(' completed __level_design');
        var newText = new_text.splice(0, splicelocation);
        /* there are 52 objects being created with the coordinates and the type of sprite*/
        function tiles(coordinates, touch, sprite) {
            this.coordinates = coordinates; //it is the coordinate
            this.touch = touch;
            this.sprite = sprite; //can be a wall, altar, gem, or the default tile
        }
        var counter = 0;
        for (var i = 0; i < newText.length; i++) {
            if (newText[i] === ",wall") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the wall
                var coor = newText[j];
                //console.log("wall cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "wall"); //creating the object
                objects.push(tile_object);
            } else if (newText[i] === ",altar") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the altar
                var coor = newText[j];
              //  console.log("altar cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "altar"); //creating the object
                objects.push(tile_object);
            } else if (newText[i] === ",gem") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("gem cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "gem"); //creating the object
                objects.push(tile_object);
            } else if (newText[i] === ",hades") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("hades cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "hades"); //creating the object
                objects.push(tile_object);
            } else if (newText[i] === ",sky") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "sky"); //creating the object
                objects.push(tile_object);
            }
            else if (newText[i] === ",sandals") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "sandals"); //creating the object
                objects.push(tile_object);
            }
            else if (newText[i] === ",message") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "message"); //creating the object
                objects.push(tile_object);
            }
             else if (newText[i] === ",shoes") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                var tile_object = new tiles(coor, "null", "shoes"); //creating the object
                objects.push(tile_object);
            }
            else if (newText[i] === ",hades") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "hades"); //creating the object
                objects.push(tile_object);
            }
            else if (newText[i] === ",sandals") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "sandals"); //creating the object
                objects.push(tile_object);
            }
            else if (newText[i] === ",key") {
                counter++; //increment the counter
                var j = i - 1; //subtracting 1 because the coordinate location in the array is before the gem
                var coor = newText[j];
                //console.log("sky cooridinates: "+coor);
                var tile_object = new tiles(coor, "null", "key"); //creating the object
                objects.push(tile_object);
            }
             else {
                continue;
            }
        }
        createBoard(size, startPos[0], startPos[1]);
        for (var i = 0; i < objects.length; i++) {
            setTile(size, objects[i]);
        }
        play(); //adding the play function here after we have initialized the board
    }
    reader.readAsText(input.files[0]);
};
var findStart = function(x) {
    var startLocation = x.indexOf(' start') + 1; //this is finding the position of where 'start' is
    var finishLocation = x.indexOf(' finish') + 1; //this is finding the position of where 'finish' is
    start = x[startLocation]; //this is the start coordinates
    finish = x[finishLocation]; //this is the end coordinates
    startEnd = [start, finish];
    return startEnd;
}
var printGrid = function(x) {
    var width = x[1];
    var size = width.split(",");
    gridwidth = size[1]; //this is the width of the grid
    return gridwidth; //now we know the width of the grid and assuming that it will always be a square we know that the height is also the same as the width
}
var createBoard = function(total, sPos, fPos) {
    createRectangles(total * total);
    setSprite(total, sPos, fPos);
}
