'use strict';

var deviceLoader = require('./device_loader'),
    deviceDescriptor = require('./analog_device.json');

module.exports = deviceLoader.loadDevice('/dev/lms_analog', deviceDescriptor);
