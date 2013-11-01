'use strict';

var descriptor = require('./motor_device.json'),
    MappedDevice = require('./mapped_device').MappedDevice;

module.exports = new MappedDevice('/dev/lms_motor', descriptor);
