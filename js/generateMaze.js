define([
    'jquery',
    'utils/utils'
], function($, Utils){
    return function(width, height) {
        // размеры лабиринта должны быть нечетными
        height = height % 2 == 0 ? height+1 : height;
        width = width % 2 == 0 ? width + 1 : width;
        var currentPosition = [0, 0];

        var map = [];
        var walls = [];

        for (var y = 0; y < height; y++) {
            map[y] = [];
            for (var x = 0; x < width; x++) {
                map[y][x] = 0;
            }
        }

        function drawWay(y, x, addBlockWalls) {
            map[y][x] = 1;
            if (addBlockWalls && Utils.isInScope(map, [y+1, x]) && (map[y+1][x] == 0)) walls.push([y+1,  x , [y,x]]);
            if (addBlockWalls && Utils.isInScope(map, [y-1, x]) && (map[y-1][x] == 0)) walls.push([y-1,  x , [y,x]]);
            if (addBlockWalls && Utils.isInScope(map, [y, x+1]) && (map[y][x+1] == 0)) walls.push([ y , x+1, [y,x]]);
            if (addBlockWalls && Utils.isInScope(map, [y, x-1]) && (map[y][x-1] == 0)) walls.push([ y , x-1, [y,x]]);
        }

        drawWay(currentPosition[0], currentPosition[1], true);

        while(walls.length != 0) {
            var randomWall = walls[Math.floor(Math.random() * walls.length)];
            var host = randomWall[2];
            var opposite = [(host[0] + (randomWall[0]-host[0])*2), (host[1] + (randomWall[1]-host[1])*2)];
            if (Utils.isInScope(map, opposite)) {
                if (map[opposite[0]][opposite[1]] == 1) {
                    walls.splice(walls.indexOf(randomWall),1);
                } else {
                    drawWay(randomWall[0], randomWall[1], false);
                    drawWay(opposite[0], opposite[1], true);
                }
            } else {
                walls.splice(walls.indexOf(randomWall),1);
            }
        }

        return map;
    };
});



