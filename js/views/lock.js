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
            this.cssClasses = {
                active: 'lock__bolt_active',
                corrected: 'lock__bolt_corrected',
                unlocked: 'lock__bolt_unlocked'
            };
            this.$key = this.$('.lock__passkey');
            this.$bolts = this.$('.lock__bolt');

            this.boltWidth = 20;
            this.boltsPosition = this.$bolts.map(function(i, item){
                return $(item).offset().left;
            });

            this.code = this.model.get('code');
            this.activeBoltIndex = 0;
            this.$activeBolt = this.$bolts.eq(this.activeBoltIndex);

            this.model.on('change:lokedPinCount', this.checkWin, this);

            this.timer();
        },

        timer: function(){
            var time = this.model.get('time');
            this.$('.lock__timer-progress').css({
                transitionDuration: time + 'ms',
                width: '100%'
            });

            window.setTimeout(function(){
                alert('Время вышло');
            }.bind(this), time);
        },

        checkWin: function() {
            if (this.model.get('lokedPinCount') === 5) {
                alert('Unlocked');
            }
        },

        moveKey: function() {
            this.$activeBolt = this.$bolts.eq(this.activeBoltIndex);
            this.$bolts.removeClass(this.cssClasses.active);
            this.$activeBolt.addClass(this.cssClasses.active);

            this.$key.css({
                left: this.$activeBolt.position().left
            })
        },

        chooseBolt: function(e) {
            if (this.isPressed) {
                return
            }
            var mouseX = e.pageX;
            for (var i = 0; i < 5; i++) {
                var boltPosition = this.boltsPosition[i];
                if (boltPosition <= mouseX && mouseX <= boltPosition + this.boltWidth) {
                    this.activeBoltIndex = i;
                    this.moveKey();
                    return;
                }
            }
        },

        pressBolt: function() {
            if (this.$activeBolt.hasClass(this.cssClasses.unlocked)) {
                return;
            }
            var targetCode = this.model.get('code')[this.activeBoltIndex];
            this.isPressed = true;
            this.activeBoltPos = 0;
            this.pressBoltInterval = setInterval(function() {
                if (this.activeBoltPos >= 100) {
                    clearInterval(this.pressBoltInterval);
                }
                this.activeBoltPos += 1.5;
                this.$activeBolt.css({
                    bottom: this.activeBoltPos + '%'
                });
                this.$key.css({
                    bottom: this.activeBoltPos + '%'
                });

                if (targetCode <= this.activeBoltPos && this.activeBoltPos <= targetCode + Settings.LOCK_OFFSET) {
                    this.$activeBolt.addClass(this.cssClasses.corrected);
                }
                if (this.activeBoltPos > targetCode + Settings.LOCK_OFFSET) {
                    this.$activeBolt.css({
                        bottom: 0
                    }).removeClass(this.cssClasses.corrected);
                    this.$key.css({
                        bottom: 0
                    });
                    clearInterval(this.pressBoltInterval);
                }
            }.bind(this), 1000/24);
        },

        stopBolt: function() {
            if (this.$activeBolt.hasClass(this.cssClasses.unlocked)) {
                return;
            }
            var targetCode = this.model.get('code')[this.activeBoltIndex];
            clearInterval(this.pressBoltInterval);
            this.isPressed = false;
            this.$activeBolt.removeClass(this.cssClasses.corrected);

            if (targetCode <= this.activeBoltPos && this.activeBoltPos <= targetCode + Settings.LOCK_OFFSET) {
                this.model.lockedPin();
                this.$activeBolt.addClass(this.cssClasses.unlocked);
            } else {
                 this.$activeBolt.css({
                    bottom: 0
                });
            }
            this.$key.css({
                bottom: 0
            });
        }
    });

    return LockView;
});