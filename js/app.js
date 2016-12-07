require.config({
    baseUrl: "js/",
    paths: {
        'jquery': 'lib/jquery-3.1.1.min',
        'underscore': 'lib/underscore-min',
        'backbone': 'lib/backbone-min',
        'localStorage': 'lib/backbone.localStorage-min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'localStorage': {
            deps: ['backbone'],
            exports: 'LocalStorage'
        }
    }
});

require([
    'jquery',
    'utils/utils',
    'models/maze',
    'models/player',
    'views/maze',
    'views/player'
], function(
    $,
    Utils,
    Maze,
    Player,
    MazeView,
    PlayerView
){
    'use strict';

    var mazeView = new MazeView({model: Maze});
    var playerView = new PlayerView({model: Player});

    Maze.on('change', function() {
        mazeView.render();
    });
    Player.on('change', function() {
        playerView.render();
        mazeView.screenPosition(Player.get('x'), Player.get('y'));
        checkWin();
    });

    function checkWin() {
        var exit = Maze.get('exit');
        if (Player.get('x') === exit[1] && Player.get('y') === exit[0]) {
            alert('You Win!');
        }
    }

    $(document).on('keydown', function(e) {
        if (37 <= e.keyCode && e.keyCode <= 40) {
            e.preventDefault();
        }
        var x = Player.get('x');
        var y = Player.get('y');
        var map = Maze.get('map');

        switch (e.keyCode) {
            case 37:
                // Left;
                Player.set('direction', 'left');
                if (Utils.isInScope(map, [x-1, y]) && map[y][x-1].type !== 'wall') {
                    Player.set('x', x-1);
                }
                break;
            case 38:
                // Up;
                Player.set('direction', 'up');
                if (Utils.isInScope(map, [x, y-1]) && map[y-1][x].type !== 'wall') {
                    Player.set('y', y-1);
                }
                break;
            case 39:
                // Right;
                Player.set('direction', 'right');
                if (Utils.isInScope(map, [x+1, y]) && map[y][x+1].type !== 'wall') {
                    Player.set('x', x+1);
                }
                break;
            case 40:
                // Down;
                Player.set('direction', 'down');
                if (Utils.isInScope(map, [x, y+1]) && map[y+1][x].type !== 'wall') {
                    Player.set('y', y+1);
                }
                break;
            default:
                break;
        }

    });
});



