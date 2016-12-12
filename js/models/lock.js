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
            activeBolt: 0,
            complexity: 'easy',
            boltWidth: 20
        },

        initialize: function() {
            var code = [];
            for (var i = 0; i < 5; i++) {
                code.push(Utils.rnd(10, 90));
            }
            this.set('code', code);
        }
    });

    return Lock;
});