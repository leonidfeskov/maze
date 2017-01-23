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
    'backbone',
    'settings',
    'utils/utils',
    'models/maze',
    'models/player',
    //'models/lock',
    'views/maze',
    'views/player'
    //'views/lock'
], function(
    $,
    Backbone,
    Settings,
    Utils,
    MazeModel,
    PlayerModel,
    //LockModel,
    MazeView,
    PlayerView
    //LockView
){
    'use strict';

    var maze = new MazeModel();
    var player = new PlayerModel();

    var mazeView = new MazeView({model: maze});
    var playerView = new PlayerView({model: player});

    maze.on('change', function() {
        mazeView.render();
    });

    player.on('change:x change:y', function() {
        playerView.renderPosition();
        mazeView.screenPosition(player.get('x'), player.get('y'));
        checkWin();
    });

    player.on('change:direction', function() {
        playerView.renderDirection();
    });

    function checkWin() {
        var exit = maze.get('exit');
        if (player.get('x') === exit[1] && player.get('y') === exit[0]) {
            alert('You Win!');
        }
    }

    $(document).on('keydown', function(e) {
        if (37 <= e.keyCode && e.keyCode <= 40) {
            e.preventDefault();
            if (player.get('isMove')) {
                return;
            }
        }
        var map = maze.get('map');

        switch (e.keyCode) {
            case 37:
                player.move('left', map);
                break;
            case 38:
                player.move('up', map);
                break;
            case 39:
                player.move('right', map);
                break;
            case 40:
                player.move('down', map);
                break;
            default:
                break;
        }
    });


    //var lock = new LockModel();
    //var lockView = new LockView({model: lock});
});
