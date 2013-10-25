'use strict';

var deviceLoader = require('./device_loader'),
    deviceDescriptor = require('./ui_device.json');

module.exports = deviceLoader.loadDevice('/dev/lms_ui', deviceDescriptor);
