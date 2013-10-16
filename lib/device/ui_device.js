'use strict';

var $ = require('./device_constants'),
    device = require('./device'),
    buffer = device.map($.UI_DEVICE_NAME, $.UI_DEVICE_BUFFER_SIZE);

exports.isButtonPressed = function (button) {
    return !!buffer[button];
};
