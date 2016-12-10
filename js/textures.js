define([
    'jquery'
], function($){
    var textures = {};
    textures.way = {};

    function formatedWithZero(str){
        while (str.length < 4) {
            str = '0' + str;
        }
        return str;
    }

    for (var i = 0; i < 16; i++) {
        var key = formatedWithZero(i.toString(2));
        var img = new Image();
        img.src = 'i/way_'+ key + '.png';
        textures.way[key] = img;
    }

    textures.promise = new Promise(function(resolve, reject){
        var isLoaded = Object.keys(textures.way).every(function(texture){
            var img = textures.way[texture];
            img.onload = function(){
                return true;
            }
            return img.onload();
        });
        if (isLoaded) {
            resolve('result');
        }
    });

    return textures;
});



