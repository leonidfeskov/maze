define([
    'jquery',
    'backbone',
    'settings',
    'utils/utils'
], function(
    $,
    Backbone,
    Settings,
    Utils
) {
    var Player = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: Settings.HEIGHT - 1,
            direction: 'up',
            isMove: false
        },

        move: function(direction, map) {
            var x = this.get('x');
            var y = this.get('y');

            this.set('direction', direction);
            switch (direction) {
                case 'left':
                    if (Utils.isInScope(map, [x-1, y]) && map[y][x-1].type !== 'wall') {
                        this.set('isMove', true);
                        this.set('x', x-1);
                    }
                    break;
                case 'up':
                    if (Utils.isInScope(map, [x, y-1]) && map[y-1][x].type !== 'wall') {
                        this.set('isMove', true);
                        this.set('y', y-1);
                    }
                    break;
                case 'right':
                    if (Utils.isInScope(map, [x+1, y]) && map[y][x+1].type !== 'wall') {
                        this.set('isMove', true);
                        this.set('x', x+1);
                    }
                    break;
                case 'down':
                    if (Utils.isInScope(map, [x, y+1]) && map[y+1][x].type !== 'wall') {
                        this.set('isMove', true);
                        this.set('y', y+1);
                    }
                    break;
            }

            this.moveTimeout = setTimeout(function(){
                this.set('isMove', false);
            }.bind(this), Settings.SPEED);
            
        }
    });

    return Player;
});