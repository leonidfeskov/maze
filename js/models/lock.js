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
    var Lock = Backbone.Model.extend({
        defaults: {
            code: [],
            lokedPinCount: 0,
            complexity: 'easy'
        },

        initialize: function() {
            // генерируем случайный код замка
            var code = [];
            for (var i = 0; i < 5; i++) {
                code.push(Utils.rnd(10, 90));
            }
            this.set('code', code);

            switch (this.get('complexity')) {
                case 'easy':
                    this.set('time', 30000);
                    break;
                case 'normal':
                    this.set('time', 25000);
                    break;
                case 'hard':
                    this.set('time', 20000);
                    break;
            }
        },

        lockedPin: function() {
            this.set('lokedPinCount', this.get('lokedPinCount') + 1);
        }
    });

    return Lock;
});