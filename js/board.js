/*
Find the start and end position
@param {array} elements - The levels elements
returns {array} startEnd - the start and end coordinates
 */
var findStart = function(elements) {
    var startLocation = elements.indexOf(' start') + 1; //this is finding the position of where 'start' is
    var finishLocation = elements.indexOf(' finish') + 1; //this is finding the position of where 'finish' is
    start = elements[startLocation]; //this is the start coordinates
    finish = elements[finishLocation]; //this is the end coordinates
    startEnd = [start, finish];
    return startEnd;
}
/*
Find the width and size (since the grid is square)
@param {array} elements - The levels elements
returns {int} gridwidth - the width of the grid
 */
var calcWidth = function(elements) {
    var width = elements[1];
    var size = width.split(",");
    var gridwidth = size[1]; //this is the width of the grid
    return gridwidth; //now we know the width of the grid and assuming that it will always be a square we know that the height is also the same as the width
}
/*
Create the board
@param {int} width - The width of the board
@param {string} sPos - The total number of tiles
@param {string} fPos - The total number of tiles
 */
var createBoard = function(width, sPos, fPos) {
	//create either 100 or 225 tiles
    createRectangles(width * width);
    //set the start and end tiles
    setEnds(width, sPos, fPos);
}

/*
Create the tiles for the board
@param {int} total - The total number of tiles
 */
function createRectangles(total) {
	//for each tile on the board
	for (var i = 0; i<total;i++){
		//create a div
		var tile = document.createElement('div');
		//if the total is 10 wide then it is easy
		if (total/10 == 10) {
			tile.className = "e_tile ";
		}
		//if the total is 15 wide then it is medium/hard
		else if (total/15 == 15){
			tile.className = "m_tile ";
		}
		//give each tile a specific id name
		tile.id = "tile_" + i;
		//add the tile to the game space
		document.getElementById("game").appendChild(tile);
	}
}
/*
Set the start and end tile
@param {int} width - The x width of the board
@param {string} startPos - The position of start
@param {string} endPos - The position of end
 */
function setEnds(width, startPos, finishPos){
	//find the start and end coordinates
	var start = startPos.split(',');
	var finish = finishPos.split(',');

	//calculate which tile number this is
	//width*(x value of tile)+(y values of tile)
	var sNum = width*(start[0]-1)+(start[1]-1);
	var fNum = width*(finish[0]-1)+(finish[1]-1);

	//add the class to the appropriate tile
	startTile = document.getElementById("tile_"+sNum);
	startTile.className += "start";
	finishTile = document.getElementById("tile_"+fNum);
	finishTile.className += "finish";
}

/*
Set each tile to the appropriate sprite
@param {int} width - The x width of th board
@param {obj} tileObj - The tile object
*/
function setTile(width, tileObj){
	//fine the coordinates of the tile
	var coord = tileObj.coordinates.split(',');
	//calculate which tile number this is
	var sNum = width*(coord[0]-1)+(coord[1]-1);
	//select the tile by its ID
	startTile = document.getElementById("tile_"+sNum);
	startTile.className = "";
	if (width == 10) {
		startTile.className = "e_tile ";
	}
	//if the total is 15 wide then it is medium/hard
	else if (width == 15){
		startTile.className = "m_tile ";
	}
	//set the selected div's class to the sprite type
	startTile.className += tileObj.sprite;
}
