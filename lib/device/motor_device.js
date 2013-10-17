'use strict';

var device = require('./device'),
    buffer = device.map('/dev/lms_motor', 48),
    PORT = require('./constants').PORT;

exports.getSpeed = function (port) {
    switch (port) {
    case PORT.A:
        return buffer.readInt8(4);
    case PORT.B:
        return buffer.readInt8(16);
    case PORT.C:
        return buffer.readInt8(28);
    default:
        return buffer.readInt8(40);
    }
};

exports.getTachoCount = function (port) {
    switch (port) {
    case PORT.A:
        return buffer.readInt32LE(8);
    case PORT.B:
        return buffer.readInt32LE(20);
    case PORT.C:
        return buffer.readInt32LE(32);
    default:
        return buffer.readInt32LE(44);
    }
};
