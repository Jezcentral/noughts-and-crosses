var gameSquares = {
	"a": null,
	"b": null,
	"c": null,
	"d": null,
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
			document.getElementById(square).addEventListener("click", function(){
				document.getElementById(square).innerHTML = "o";
			});
		}
	}
}

function isOpponentWinner(){
	//return (checkTheBoard("o", 3, "x", 0).length > 0) ? true : false;
	var wonMoves = checkTheBoard("o", 3, "x", 0);

	if(wonMoves.length > 0) {
		return true;
	}
	else {
		return false;
	}

}

function canIWinThisTurn(){
	var winningMoves = checkTheBoard("x", 2, "o", 0);

	if(winningMoves.length > 0) {
		fillInSquare(whichRow(winningMoves));
		return true;
	}
	else {
		return false;
	}

}

function canOpponentWinNextTurn(){
	var rowsThatNeedBlocking = checkTheBoard("o", 2, "x", 0);

	if(rowsThatNeedBlocking.length > 0) {
		fillInSquare(whichRow(rowsThatNeedBlocking));
		return true;
	}
	else {
		return false;
	}

}

function canIWinNextTurn(){
	var possibleRows = checkTheBoard("x", 1, "o", 0);
	if(possibleRows.length > 0) {
		var possibleSquares = [];
		for(var i = 0; i < possibleRows.length; i++) {
			possibleSquares = possibleSquares.concat(possibleRows[i]);
		}
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
			fillInSquare(whichRow(winningMoves));
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
	var possibleRows = checkTheBoard("o", 1, "x", 0);
	if(possibleRows.length > 0) {
		var possibleSquares = [];
		for(var i = 0; i < possibleRows.length; i++) {
			possibleSquares = possibleSquares.concat(possibleRows[i]);
		}
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
			fillInSquare(whichRow(winningMoves));
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

function endGame(){
	console.log("There is a winner!");
}

function randomRowPicker(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function whichRow(arrayOfSquares) {
	// should check against squaresInOrderOfPriority
	var squareToFill = null;
	for(var i = 0; i < squaresInOrderOfPriority.length; i++) {
		for(var j = 0; j < arrayOfSquares.length; j++) {
			if(squaresInOrderOfPriority[i] == arrayOfSquares[j]) {
				squareToFill = arrayOfSquares[j];
				break;
			}
		}
		if(squareToFill != null) {
			break;
		}
	}
	return arrayOfSquares[j];
}

function fillInSquare(row) {
	console.log("Row is " + row);
	for(var i = 0; i < row.length; i++) {
		if(gameSquares[row[i]] == null) {
			fillSquare(row[i]);
			break;
		}
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
		endGame();
	}
	else if(canIWinThisTurn()) {
		console.log("You have won!");
	}
	else if(canOpponentWinNextTurn()) {
		console.log("You need to block your opponent!");
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
