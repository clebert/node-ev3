'use strict';

var deviceLoader = require('./device_loader'),
    deviceDescriptor = require('./motor_device.json');

module.exports = deviceLoader.loadDevice('/dev/lms_motor', deviceDescriptor);
