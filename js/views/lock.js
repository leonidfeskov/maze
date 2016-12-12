define([
    'jquery',
    'backbone',
    'settings'
], function(
    $,
    Backbone,
    Settings
) {
    var LockView = Backbone.View.extend({
        el: $('.js-lock'),

        events: {
            mousemove: 'chooseBolt',
            mousedown: 'pressBolt',
            mouseup: 'stopBolt'
        },

        initialize: function() {
            this.$bolts = this.$('.lock__bolt');
            this.boltsPosition = this.$bolts.map(function(i, item){
                return $(item).offset().left;
            });
            this.boltWidth = this.model.get('boltWidth');
            console.log(this.boltsPosition);

            this.model.bind('change:activeBolt', this.renderActiveBolt, this);
        },

        chooseBolt: function(e) {
            var mouseX = e.pageX;
            for (var i = 0; i < 5; i++) {
                var boltPosition = this.boltsPosition[i];
                if (boltPosition <= mouseX && mouseX <= boltPosition + this.boltWidth) {
                    this.model.set('activeBolt', i);
                }
            }
        },

        pressBolt: function() {
            this.activeBoltPos = 0;
            this.pressBoltInterval = setInterval(function() {
                if (this.activeBoltPos >= 100) {
                    clearInterval(this.pressBoltInterval);
                }
                this.activeBoltPos += 1;
                this.$activeBolt.css({
                    top: this.activeBoltPos + '%'
                });
            }.bind(this), 1000/24);
        },

        stopBolt: function() {
            clearInterval(this.pressBoltInterval);
            if (this.activeBoltPos >= )
        },

        renderActiveBolt: function() {
            this.activeBoltIndex = this.model.get('activeBolt');
            this.$activeBolt = this.$bolts.eq(this.activeBoltIndex);
            this.$bolts.removeClass('lock__bolt_active');
            this.$activeBolt.addClass('lock__bolt_active');
        }


    });

    return LockView;
});