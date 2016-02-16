/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(2);
	
	$(function () {
	  var $board = $("#board");
	  new View($board);
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(3);
	var Coord = __webpack_require__(5);
	
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
			$square.removeClass();
			if (Coord.prototype.includes(view.snake.segments, squarePos)) {
				$square.addClass('snakeSeg');
	
				if (Coord.prototype.equals(squarePos, view.snake.front)) {
					$square.addClass('head');
				}
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
			var $scoreMessage = $('<h3>');
			$scoreMessage.html("Game Over! You collected " + (this.snake.segments.length-1) + " apple(s).");
			this.$el.prepend($scoreMessage);
			// alert("Game Over! You collected " + (this.snake.segments.length-1) + " apple(s).");
		}
		finally {
		}
	};
	
	module.exports = View;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(4);
	var Coord = __webpack_require__(5);
	
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Coord = __webpack_require__(5);
	
	
	function Snake(front, dir, segments) {
		this.front = front;
		this.currentDir = dir;
		this.segments = segments;
		this.turning = false;
	}
	
	Snake.prototype.move = function () {
		this.front = this.nextMove();
		this.segments.unshift(this.front);
		this.segments.pop();
		this.turning = false;
	};
	
	Snake.prototype.nextMove = function () {
		var next = Coord.prototype.plus(this.front, this.currentDir);
		return next;
	};
	
	Snake.prototype.isOccupied = function (pos) {
		if (Coord.prototype.includes(this.segments, pos)) {
			return true;
		} else {
			return false;
		}
	};
	
	Snake.prototype.turn = function (dir) {
		if (this.turning) {
			return;
		} else {
			this.turning = true;
			this.currentDir = dir;
		}
	};
	
	Snake.prototype.grow = function () {
		var opposite = Coord.prototype.findOpposite(this.currentDir);
		var last = this.segments[this.segments.length-1];
		var tail = Coord.prototype.plus(last, opposite);
		this.segments.push(tail);
	};
	
	module.exports = Snake;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Coord () {}
	
	Coord.prototype.DIRS = function () {
		return {
							"E": [0, 1],
	 						"S": [1, 0],
	 						"W": [0, -1],
	 						"N": [-1, 0]
	 					};
	};
	
	Coord.prototype.plus = function (pos, dir) {
		var newX = pos[0] + (this.DIRS()[dir])[0];
		var newY = pos[1] + (this.DIRS()[dir])[1];
		return [newX, newY];
	};
	
	Coord.prototype.equals = function (pos1, pos2) {
		if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
			return true;
		} else {
			return false;
		}
	};
	
	Coord.prototype.includes = function (array, pos) {
		for (var i = 0; i < array.length; i++) {
			if (Coord.prototype.equals(array[i], pos)) {
				return true;
			}
		}
		return false;
	};
	
	Coord.prototype.isOpposite = function (dir1, dir2) {
		var opp = (Coord.prototype.findOpposite(dir1));
		if (opp === dir2) {
			return true;
		} else {
			return false;
		}
	};
	
	Coord.prototype.findOpposite = function (dir) {
		if (dir === "N") {
			return "S";
		} else if (dir === "S") {
			return "N";
		} else if (dir === "E") {
			return "W";
		} else if (dir === "W") {
			return "E";
		}
	};
	
	module.exports = Coord;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map