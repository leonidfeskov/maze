define([
    'jquery',
    'backbone',
    'settings',
    'utils/utils',
    'textures'
], function(
    $,
    Backbone,
    Settings,
    Utils,
    textures
) {
    var MazeView = Backbone.View.extend({
        el: $('.js-maze'),

        initialize: function() {
            this.el.style.width = (this.model.get('width') * Settings.CELL_SIZE) + 'px';
            this.el.style.height = (this.model.get('height') * Settings.CELL_SIZE) + 'px';

            this.render();
        },

        render: function() {
            var map = this.model.get('map');
            var width = this.model.get('width');
            var height = this.model.get('height');
            var exit = this.model.get('exit');

            var canvas = document.querySelector('.js-maze-map');
            canvas.width = Settings.WIDTH * Settings.CELL_SIZE;
            canvas.height = Settings.HEIGHT * Settings.CELL_SIZE;
            this.ctx = canvas.getContext('2d');

            textures.promise
                .then(
                    function result(){
                        for (var y = 0; y < height; y++) {
                            for (var x = 0; x < width; x++) {
                                this.ctx.drawImage(
                                    textures.way[this.getWayType(y, x)],
                                    x * Settings.CELL_SIZE,
                                    y * Settings.CELL_SIZE,
                                    Settings.CELL_SIZE,
                                    Settings.CELL_SIZE
                                );
                            }
                        }
                    }.bind(this)
                );
        },

        getWayType: function(y, x) {
            var map = this.model.get('map');
            if (map[y][x].type === 'wall') {
                return '0000';
            }
            var str = '';
            str += (Utils.isInScope(map, [x, y-1]) && map[y-1][x].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x+1, y]) && map[y][x+1].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x, y+1]) && map[y+1][x].type === 'way' ) ? '1' : '0';
            str += (Utils.isInScope(map, [x-1, y]) && map[y][x-1].type === 'way' ) ? '1' : '0';
            return str;
        },

        screenPosition: function(x, y) {
            var screensCount = this.model.get('width') / Settings.CELLS_ON_SCREEN;
            var offset = Settings.CELL_SIZE * Settings.CELLS_ON_SCREEN;
            var screenX = Math.floor(x / Settings.CELLS_ON_SCREEN);
            var screenY = Math.floor(y / Settings.CELLS_ON_SCREEN);
            this.el.style.left = -(offset * screenX) + 'px'
            this.el.style.bottom = -(offset * (screensCount - screenY - 1)) + 'px'
        }
    });

    return MazeView;
});