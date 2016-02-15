var Coord = require("./coord");


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