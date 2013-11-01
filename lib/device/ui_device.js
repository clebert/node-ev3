'use strict';

var descriptor = require('./ui_device.json'),
    MappedDevice = require('./mapped_device').MappedDevice;

module.exports = new MappedDevice('/dev/lms_ui', descriptor);
