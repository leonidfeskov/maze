define([
    'jquery',
    'backbone',
    'generateMaze'
], function($, Backbone, generateMaze) {
    var size = 15;

    var Cell = function(type) {
        this.type = type;
    };

    var Maze = Backbone.Model.extend({
        defaults: {
            width: size,
            height: size,
            cellSize: 150,
            exit: [0, size - 1]
        },

        initialize: function() {
            var map = generateMaze(size, size);
            this.map = [];
            for (var y = 0; y < this.get('height'); y++) {
                this.map[y] = [];
                for (var x = 0; x < this.get('width'); x++) {
                    if (map[y][x] === 0) {
                        this.map[y][x] = new Cell('wall');
                    } else {
                        this.map[y][x] = new Cell('way');
                    }

                }
            }
            this.set('map', this.map);
        }
    });

    return new Maze;
});