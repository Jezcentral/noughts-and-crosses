var gameSquares = {
	"a": null,
	"b": "o",
	"c": null,
	"d": "o",
	"e": null,
	"f": null,
	"g": null,
	"h": null,
	"i": null
};

var winningPossibilities = [
	["a", "b", "c"],
	["d", "e", "f"],
	["g", "h", "i"],
	["a", "d", "g"],
	["b", "e", "h"],
	["c", "f", "i"],
	["a", "e", "i"],
	["c", "e", "g"]
];

var squaresInOrderOfPriority = ["e", "a", "c", "g", "i", "b", "d", "f", "h"];

function NoughtsAndCrosses() {
	initialiseBoard();// testing only, delete afterwards
	considerMove();
}

function initialiseBoard() {
	for(var square in gameSquares) {
		if(gameSquares.hasOwnProperty(square)) {
			if(gameSquares[square] == "o") {
				document.getElementById(square).innerHTML = "o";
			}
			if(gameSquares[square] == "x") {
				document.getElementById(square).innerHTML = "x";
			}
		}
	}
}

function checkTheBoard(playerType, numberInPlayerLine, opponentType, numberInOpponentLine){
	var arrayOfLines = [];
	for(var i = 0; i < winningPossibilities.length; i++) {
		var playerCount = 0;
		var opponentCount = 0;
		for(var j = 0; j < winningPossibilities[i].length; j++) {
			if(gameSquares[winningPossibilities[i][j]] == playerType) {
				playerCount++;
			}
			if(gameSquares[winningPossibilities[i][j]] == opponentType) {
				opponentCount++;
			}
		}
		if((playerCount == numberInPlayerLine) && (opponentCount == numberInOpponentLine)) {
			arrayOfLines.push(winningPossibilities[i]);
		}
	}
	return arrayOfLines;
}

function isOpponentWinner(){
	// look for any lines with 3 o's
	var possibleRows = checkTheBoard("o", 3, "x", 0);
	// if there is more than zero, o has won the game
	console.log(possibleRows);
	if(possibleRows.length > 0) {
		return true;
	}
	else {
		return false;
	}
}

function canIWinThisTurn(){
	// look for any lines with 2 x's and no o's
	var possibleRows = checkTheBoard("x", 2, "o", 0);
	// if there are, x can win the game this turn
	if(possibleRows.length > 0) {
		fillInSquare(possibleRows);
		return true;
	}
	else {
		return false;
	}
}

function canOpponentWinNextTurn(){
	// look for any lines with 2 o's and no x's
	var possibleRows = checkTheBoard("o", 2, "x", 0);
	// if there are, o can win the game next turn, and needs to be blocked
	if(possibleRows.length > 0) {
		fillInSquare(possibleRows);
		return true;
	}
	else {
		return false;
	}
}

function canIWinNextTurn(){
	// look for any lines with 1 x and no o's
	var possibleRows = checkTheBoard("x", 1, "o", 0);
	if(possibleRows.length > 0) {
		var possibleSquares = [];
		for(var i = 0; i < possibleRows.length; i++) {
			possibleSquares = possibleSquares.concat(possibleRows[i]);
		}
		// now search for 2 interceding lines with one x each in them
		var winningMoves = [];
		for(var i = 0; i < possibleSquares.length; i++) {
			for(var j = i + 1; j < possibleSquares.length; j++) {
				if((possibleSquares[j] == possibleSquares[i]) && (gameSquares[possibleSquares[i]] == null)) {
					winningMoves.push(possibleSquares[i]);
					break;
				}
			}
		}
		if(winningMoves.length > 0) {
			fillInSquare(winningMoves);
			return true;
		}
		else {
			return false;
		}

	}
	else {
		return false;
	}
}

function canOpponentWinNextNextTurn(){
	// look for any lines with 1 o and no x's
	var possibleRows = checkTheBoard("o", 1, "x", 0);
	console.log("possibleRows");
	console.log(possibleRows);
	console.log("possibleRows");
	if(possibleRows.length > 0) {
		var possibleSquares = [];
		for(var i = 0; i < possibleRows.length; i++) {
			possibleSquares = possibleSquares.concat(possibleRows[i]);
		}
		// now search for 2 interceding lines with one o each in them
		var winningMoves = [];
		for(var i = 0; i < possibleSquares.length; i++) {
			for(var j = i + 1; j < possibleSquares.length; j++) {
				if((possibleSquares[j] == possibleSquares[i]) && (gameSquares[possibleSquares[i]] == null)) {
					winningMoves.push(possibleSquares[i]);
					break;
				}
			}
		}
		if(winningMoves.length > 0) {
			fillInSquare(winningMoves);
			return true;
		}
		else {
			return false;
		}

	}
	else {
		return false;
	}
}

function checkMoves(moves){
	console.log("moves is " + moves);
	return (moves.length > 0) ? true : false;
}

function fillInSquare(playableRows) {
	var row = playableRows[0];
	console.log("Row is " + row);
	for(var i = 0; i < row.length; i++) {
		if(gameSquares[row[i]] == null) {
			console.log(row[i] + " is playable.");
			fillSquare(row[i]);
			break;
		}
			console.log(row[i] + " is akready used.");
	}
}

function fillSquare(square){
	document.getElementById(square).innerHTML = "x";
	gameSquares[square] = "x";
}

function makeAMove(){
	for(var i = 0; i < squaresInOrderOfPriority.length; i++) {
		if(squaresInOrderOfPriority[i] == null) {
			fillInSquare([squaresInOrderOfPriority[i]]);
			return true;
		}
		else {
			return false;
		}
	}
}

function considerMove(){
	if(isOpponentWinner()) {
		console.log("The other bloke already won!");
	}
	else if(canIWinThisTurn()) {
		console.log("You won this turn!");
	}
	else if(canOpponentWinNextTurn()) {
		console.log("You have blocked your opponent!");
	}
	else if(canIWinNextTurn()) {
		console.log("You can force the win!");
	}
	else if(canOpponentWinNextNextTurn()) {
		console.log("You need to block him or he'll force the win next time!");
	}
	else if(makeAMove()) {
		console.log("You have taken the centre square!");
	}
	else {
		console.log("A strange game. The only winning move is not to play.");
	}
}
