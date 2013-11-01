'use strict';

var EventEmitter = require('events').EventEmitter,
    uiDevice = require('./device/ui_device'),
    util = require('util');

function Button(getButtonState) {
    var lastState = 0;

    EventEmitter.call(this);

    this.notify = function () {
        var state = getButtonState();

        if (state !== lastState) {
            lastState = state;

            if (state) {
                this.emit('press');
            } else {
                this.emit('release');
            }
        }
    };

    this.isDown = function () {
        return !!getButtonState();
    };

    this.isUp = function () {
        return !getButtonState();
    };
}

util.inherits(Button, EventEmitter);

exports.up = new Button(uiDevice.getUpButtonState);
exports.enter = new Button(uiDevice.getEnterButtonState);
exports.down = new Button(uiDevice.getDownButtonState);
exports.right = new Button(uiDevice.getRightButtonState);
exports.left = new Button(uiDevice.getLeftButtonState);
exports.escape = new Button(uiDevice.getEscapeButtonState);

setInterval(function () {
    exports.up.notify();
    exports.enter.notify();
    exports.down.notify();
    exports.right.notify();
    exports.left.notify();
    exports.escape.notify();
}, 30);
