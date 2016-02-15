var Snake = require("./snake");
var Coord = require("./coord");

function Board(snake) {
	this.maxCol = 30;
	this.maxRow = 20;
	this.snake = new Snake([5, 5], "E", [[5, 5]]);
	this.setApple();
}

Board.prototype.validMove = function (pos) {
	if (pos[0] < 0 || pos[0] >= this.maxRow || pos[1] < 0 || pos[1] >= this.maxCol) {
		return false;
	} else if (this.snake.isOccupied(pos)) {
		debugger
		return false;
	} else {
		return true;
	}
};

Board.prototype.randomPosition = function () {
  var row = Math.floor(Math.random() * this.maxRow);
  var col = Math.floor(Math.random() * this.maxCol);
  return [row, col];
}

Board.prototype.setApple = function () {
	var found = false;
	var newApple;
	while (!found) {
		var newApple = this.randomPosition();
		if (!this.snake.isOccupied(newApple)) {
			found = true;
		}
	}
	this.apple = newApple;
}

Board.prototype.moveSnake = function () {
	var pos = this.snake.nextMove();
	if (this.validMove(pos)) {
		if (Coord.prototype.equals(this.apple, pos)) {
			this.eatApple();
		}
		this.snake.move();
	}
	else {
		throw "Game Over!";
		// do nothing
	}
};

Board.prototype.eatApple = function () {
	// debugger
	this.setApple();
	this.snake.grow();
};

module.exports = Board;