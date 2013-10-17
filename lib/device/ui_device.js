'use strict';

var device = require('./device'),
    buffer = device.map('/dev/lms_ui', 6);

exports.isButtonPressed = function (button) {
    return !!buffer[button];
};
