'strict mode';

/**
 * Initializing Application
 *  Compatibility solving
 */
var app = {
	checkTiles: tileController,
	resetGame: gameController,
	setLevel: setLevel
}

/**
 * Variables
 */
var timeout = 2000;
var selected = [];
var startTime = null;
var endTime = null;
var totalNumberOfTiles = 0;
var numberOfSolvedTiles = 0;
var tileModels = [
	{"dataId": "p1", "contentType": "img", "content": "http://images.all-free-download.com/images/graphicthumb/facebook_93482.jpg"},
	{"dataId": "p2", "contentType": "img", "content": "http://seeklogo.com/images/T/twitter-icon-logo-1041A58E6A-seeklogo.com.gif"},
	{"dataId": "p3", "contentType": "text", "content": "M$", "content2": "Microsoft"},
	{"dataId": "p4", "contentType": "text", "content": "D&D", "content2": "Dungeons & Dragons"},
	{"dataId": "p5", "contentType": "color", "content": "blue"},
	{"dataId": "p6", "contentType": "color", "content": "green"},
	{"dataId": "p7", "contentType": "text", "content": "GBP", "content2": "Great Britain"},
	{"dataId": "p8", "contentType": "text", "content": "CHF", "content2": "Swiss Frank"}
];
var boardModel = {
	"background": "http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png",
	"tileBack": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/HTML5_Shiny_Icon.svg/200px-HTML5_Shiny_Icon.svg.png"
};
var level = 2; // 2 - Easy, 8 - Medium, 32 - Hard

/**
 * Helper functions
 *
 * Timer
 */
function startTimer() {
	startTime = new Date();
}
function stopTimer() {
	endTime = new Date();
}
function resetTimer() {
	startTime = null;
	endTime = null;
}
function calculateTime() {
	return endTime - startTime;
}

/**
 * Business Logic functions
 */
function isSelected(element) {
	var result = false;
	
    for (var i = 0; i < selected.length; i++) {
        if (selected[i] === element) {
            result = true;
        }
    }
	return result;
}

function select(element) {
	selected.push(element);
}

function resetSelectedList() {
	selected = [];
}

function isSelectedLessThenTwo() {
	return selected.length < 2;
}

function areTwoTilesSelected() {
	return selected.length == 2;
}

function isPairSelected() {
	return selected[0].getAttribute('data-id') == selected[1].getAttribute('data-id');
}

function addPoint() {
	numberOfSolvedTiles += 2;
}

function isSolved() {
	return numberOfSolvedTiles == totalNumberOfTiles;
}

/**
 * DOM Manipulation
 */
 function getTotalTiles() {
	return document.getElementsByClassName('tile').length;
 }
 
 function resetTileNumbers() {
	totalNumberOfTiles = getTotalTiles();
	numberOfSolvedTiles = 0;
 }
 
 function flipTile(element) {
	var front = element.getElementsByClassName("front");
	var back = element.getElementsByClassName("back");
	front[0].classList.toggle("hidden");
	back[0].classList.toggle("hidden");
 }
 
 function removeSelectedPair() {
	for(index in selected) {
		removeTilesChildElements(selected[index]);
	}
 }
 
 function hideSelectedPair() {
	for(index in selected) {
		flipTile(selected[index]);
	}
 }
 
 function removeTilesChildElements(tile) {
	while (tile.firstChild) {
		tile.removeChild(tile.firstChild);
	}
 }
 
 function showResults(time, tiles) {
	var timeInSec = time / 1000;
	var points = Math.ceil(tiles / timeInSec * 1000) * totalNumberOfTiles;
	alert(
		"You win" + 
		"\nYour time: " + timeInSec + "sec." + 
		"\nYou solved " + tiles + " tiles" +
		"\nYour points: " + points
	);
 }
 
 function generateTiles() {
	var tileList = [];
	for(var i = 0; i < level && i < tileModels.length; i++){
		tileList.push(generateTile(i));
		tileList.push(generateTile(i));
	}
	
	return tileList;
 }
 
 function getDateHash() {
	var baseDate = new Date(96735);
	var now = new Date();
	var mod = Math.floor(Math.random() * 19830110);
	
	return now - baseDate + mod;
 }
 
 function generateTile(i) {
	var model = tileModels[i];
	var parser = new DOMParser();
	
	var tile = document.createElement('DIV');
	tile.className = "tile level-" + level;
	var innerContainer = document.createElement("DIV");
	innerContainer.setAttribute("id", getDateHash());
	innerContainer.setAttribute("data-id", model.dataId);
	innerContainer.setAttribute("onclick", "app.checkTiles(this)");
	//innerContainer.className = "opaque";
	
	switch(model.contentType) {
		case 'img':
			var front =  document.createElement("IMG");
			front.setAttribute("src", model.content);
			break;
		case  'color':
			var front =  document.createElement("DIV");
			front.setAttribute("style", "background-color: " + model.content);
			break;
		default:
			var front =  document.createElement("H1");
			var text = document.createTextNode(model.content)
			front.appendChild(text);
			break;
	}
	front.className = "front hidden opaque";
	
	var back =  document.createElement("IMG");
	back.setAttribute("src", boardModel.tileBack);
	back.className = "back";
	
	innerContainer.appendChild(front);
	innerContainer.appendChild(back);
	tile.appendChild(innerContainer);
	
	return tile;
 }
 
 function generateRandomBoardLayout(board) {
	var tileList = generateTiles();
	
	while (tileList.length > 0){
		var i = Math.floor(Math.random() * tileList.length);
		board.appendChild(tileList[i]);
		tileList.splice(i, 1);
	}
 }
 
 function setBackground(board) {
	board.setAttribute("style", "background-image: url('"+ boardModel.background +"')");
 }

function setLevel(value) {
	if(value == 2 || value == 8 || value == 16) {
		level = value;
	}
}
 
 /**
  * Controller functions
  */
  function gameController() {
	var board = document.getElementsByClassName("board")[0];
	removeTilesChildElements(board);
	setBackground(board);
	generateRandomBoardLayout(board, level);
	resetTileNumbers();
	resetTimer();
 }
  
function tileController(tile) {
	if(startTime == null) {
		startTimer();
	}
	if(isSelectedLessThenTwo() && !isSelected(tile)) {
		flipTile(tile);
		select(tile);
		if(areTwoTilesSelected()) {
			if(isPairSelected()) {
				addPoint();
				removeSelectedPair();
				resetSelectedList();
			} else {
				setTimeout(
					function() {
						hideSelectedPair();
						resetSelectedList();
					}
				, timeout);
			}
			
			if(isSolved()) {
				stopTimer()
				var time = calculateTime();
				showResults(time, numberOfSolvedTiles);
			}
		}
	}
 }
 