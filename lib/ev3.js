'use strict';

var analogDevice = require('./device/analog_device'),
    constants = require('./device/constants'),
    pwmDevice = require('./device/pwm_device'),
    uiDevice = require('./device/ui_device'),
    BUTTON = constants.BUTTON,
    MOTOR_PORT = constants.MOTOR_PORT,
    intervalID;

intervalID = setInterval(function () {
    if (uiDevice.getButtonState(BUTTON.UP)) {
        console.log('UP');
    }

    if (uiDevice.getButtonState(BUTTON.ENTER)) {
        console.log('ENTER');
    }

    if (uiDevice.getButtonState(BUTTON.DOWN)) {
        console.log('DOWN');
    }

    if (uiDevice.getButtonState(BUTTON.RIGHT)) {
        console.log('RIGHT');
    }

    if (uiDevice.getButtonState(BUTTON.LEFT)) {
        console.log('LEFT');
    }

    if (uiDevice.getButtonState(BUTTON.ESCAPE)) {
        console.log('ESCAPE');

        clearInterval(intervalID);
    }
}, 30);
