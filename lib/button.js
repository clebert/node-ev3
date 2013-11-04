'use strict';

var EventEmitter = require('events').EventEmitter,
    uiDevice = require('./device/ui_device'),
    util = require('util');

function Button(getButtonState) {
    EventEmitter.call(this);

    this.isPressed = function () {
        return !!getButtonState();
    };
}

util.inherits(Button, EventEmitter);

function ButtonHolder(getButtonState) {
    this.button = new Button(getButtonState);
    this.pressed = false;
}

ButtonHolder.prototype.check = function () {
    var pressed = this.button.isPressed();

    if (pressed !== this.pressed) {
        this.pressed = pressed;

        this.button.emit(pressed ? 'press' : 'release');
    }
};

function init() {
    var nameToButtonHolder = {},
        names;

    names = [
        'Down', 'Enter', 'Escape', 'Left', 'Right', 'Up'
    ];

    names.forEach(function (name) {
        var getButtonState = uiDevice['get' + name + 'ButtonState'],
            buttonHolder = new ButtonHolder(getButtonState);

        nameToButtonHolder[name] = buttonHolder;

        exports[name.toLowerCase()] = buttonHolder.button;
    });

    setInterval(function () {
        names.forEach(function (name) {
            nameToButtonHolder[name].check();
        });
    }, 30);
}

init();
