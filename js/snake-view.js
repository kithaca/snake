var Board = require("./board");
var Coord = require("./coord");

function View($el) {
	this.$el = $el;
	this.board = new Board();
	this.snake = this.board.snake;
	this.buildBoard();
	this.render();
	$(window).on('keydown', this.handleKeyEvent.bind(this));
	this.startGame = setInterval(this.step.bind(this), 100);
}

View.prototype.buildBoard = function () {
	for (var i = 0; i < this.board.maxRow; i++) {
		var $row = $('<ul>');

		for (var j = 0; j < this.board.maxCol; j++) {
			var $square = $('<li>');
			$row.append($square);
			$square.data('pos', [i, j]);
		}
		this.$el.append($row);
	}
};

View.prototype.handleKeyEvent = function (e) {
	e.preventDefault();
	var newDir;
	// debugger
	switch(e.which) {
		case 37: // left
			newDir = "W";
			break;
		case 38: // up
			newDir = "N";
			break;
		case 39: // right
			newDir = "E";
			break;
		case 40: // down
			newDir = "S";
			break;
		default:
			// do nothing
	}
	var currDir = this.snake.currentDir;
	if (newDir && newDir !== currDir && !Coord.prototype.isOpposite(newDir, currDir)) {
		this.snake.turn(newDir);
	} else {
		// do nothing
	}
};

View.prototype.render = function () {
	var $squares = $('li');
	var view = this;
	$.each($squares, function(idx, square) {
		$square = $(square);
		var squarePos = $square.data('pos');
		$square.removeClass('snakeSeg');
		$square.removeClass('apple');
		if (Coord.prototype.includes(view.snake.segments, squarePos)) {
			$square.addClass('snakeSeg');
		} else if (Coord.prototype.equals(squarePos, view.board.apple)) {
			$square.addClass('apple');
		}
	});
};

View.prototype.step = function () {
	try {
		this.board.moveSnake();
		this.render();
	}
	catch(err) {
		window.clearInterval(this.startGame);
		console.log(err.message);
		alert("Game Over! You collected " + (this.snake.segments.length-1) + " apple(s).");
	}
	finally {
	}
};

module.exports = View;