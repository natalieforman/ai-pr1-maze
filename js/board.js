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
@param {int} startPos - The position of start
@param {int} endPos - The position of end
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
	//set the selected div's class to the sprite type
	startTile.className += tileObj.sprite;
}
