'use strict';

var device = require('./device'),
    buffer = device.map('/dev/lms_ui', 6);

exports.getButtonState = function (button) {
    return !!buffer[button];
};
