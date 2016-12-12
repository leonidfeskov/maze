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

            this.$key = this.$('.lock__passkey');

            this.code = this.model.get('code');

            this.activeBoltIndex = this.model.get('activeBolt');
            this.$activeBolt = this.$bolts.eq(this.activeBoltIndex);
            this.unlocked = [];

            this.model.bind('change:activeBolt', this.renderActiveBolt, this);
        },

        chooseBolt: function(e) {
            if (this.isPresedBolt) {
                return
            }
            var mouseX = e.pageX;
            for (var i = 0; i < 5; i++) {
                var boltPosition = this.boltsPosition[i];
                if (boltPosition <= mouseX && mouseX <= boltPosition + this.boltWidth) {
                    this.model.set('activeBolt', i);
                    this.activeCode = this.code[i];
                    return;
                }
            }
        },

        pressBolt: function() {
            if (this.unlocked.indexOf(this.model.get('activeBolt')) !== -1) {
                return;
            }
            this.isPresedBolt = true;
            this.activeBoltPos = 0;
            this.pressBoltInterval = setInterval(function() {
                if (this.activeBoltPos >= 100) {
                    clearInterval(this.pressBoltInterval);
                }
                this.activeBoltPos += 1;
                this.$activeBolt.css({
                    bottom: this.activeBoltPos + '%'
                });
                this.$key.css({
                    bottom: this.activeBoltPos + '%'
                });

                if (this.activeCode <= this.activeBoltPos && this.activeBoltPos <= this.activeCode + Settings.LOCK_OFFSET) {
                    this.$activeBolt.addClass('lock__bolt_true');
                }
                if (this.activeBoltPos > this.activeCode + Settings.LOCK_OFFSET) {
                    this.$activeBolt.css({
                        bottom: 0
                    }).removeClass('lock__bolt_true');
                    this.$key.css({
                        bottom: 0
                    });
                    clearInterval(this.pressBoltInterval);
                }

            }.bind(this), 1000/24);
        },

        stopBolt: function() {

            clearInterval(this.pressBoltInterval);
            this.isPresedBolt = false;
            this.$activeBolt.removeClass('lock__bolt_true');

            if (this.activeCode <= this.activeBoltPos && this.activeBoltPos <= this.activeCode + Settings.LOCK_OFFSET) {
                this.$activeBolt.addClass('lock__bolt_unlocked');
                this.unlocked.push(this.activeBoltIndex);
            } else {
                 this.$activeBolt.css({
                    bottom: 0
                });
            }
            this.$key.css({
                bottom: 0
            });
        },

        renderActiveBolt: function() {
            this.activeBoltIndex = this.model.get('activeBolt');
            this.$activeBolt = this.$bolts.eq(this.activeBoltIndex);
            this.$bolts.removeClass('lock__bolt_active');
            this.$activeBolt.addClass('lock__bolt_active');

            this.$key.css({
                left: this.$activeBolt.position().left
            })
        }


    });

    return LockView;
});