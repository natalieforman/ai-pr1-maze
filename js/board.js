//Wall, free, player, minotaur, sword, exit
function createRectangles(total) {
	console.log(total);
	for (var i = 0; i<total;i++){
		var tile = document.createElement('div');
		if (total/10 == 10) {
			tile.className = "e_tile ";
		}
		else if (total/15 == 15){
			tile.className = "m_tile ";
		}
		tile.id = "tile_" + i;
		document.getElementById("game").appendChild(tile);
	}
}

//setting start and finish tiles
function setSprite(total, startPos, finishPos){
	//find the start and end coordinates
	var start = startPos.split(',');
	var finish = finishPos.split(',');

	//calculate which tile number this is
	var sNum = total*(start[0]-1)+(start[1]-1);
	var fNum = total*(finish[0]-1)+(finish[1]-1);

	//add the class to the appropriate tile
	startTile = document.getElementById("tile_"+sNum);
	startTile.className += "start";
	finishTile = document.getElementById("tile_"+fNum);
	finishTile.className += "finish";
}

//generic create space function
//pass the id you want the space to have
function createSpace(sId) {
	var player = document.createElement('div');
	player.id = sId;
	player.className = "tile";
	player.innerHTML = sId;
	document.getElementById("game").appendChild(player);
}

function setTile(width, tileObj){
	//console.log(tileObj.coordinates);
	var coord = tileObj.coordinates.split(',');
	//calculate which tile number this is
	var sNum = width*(coord[0]-1)+(coord[1]-1);
	console.log(tileObj.sprite);
	startTile = document.getElementById("tile_"+sNum);
	startTile.className += tileObj.sprite;
}
