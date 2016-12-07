define([
	'jquery'
], function($) {
	var Utils = function() {
		// проверяем, что клетка (y, x) не выходит за границы лабиринта
		this.isInScope = function(map, coord) {
			return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
		}
	};

	return new Utils();
});