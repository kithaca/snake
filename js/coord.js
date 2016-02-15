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