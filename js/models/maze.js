define([
    'jquery',
    'backbone',
    'settings',
    'generateMaze'
], function(
    $,
    Backbone,
    Settings,
    generateMaze
) {
    var Cell = function(type) {
        this.type = type;
    };

    var Maze = Backbone.Model.extend({
        defaults: {
            width: Settings.WIDTH,
            height: Settings.HEIGHT,
            exit: [0, Settings.WIDTH - 1]
        },

        initialize: function() {
            var map = generateMaze(Settings.WIDTH, Settings.HEIGHT);
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

    return Maze;
});