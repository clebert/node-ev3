'use strict';

var device = require('./device'),
    buffer = device.map('/dev/lms_motor', 48),
    MOTOR_PORT = require('./constants').MOTOR_PORT;

exports.getSpeed = function (motorPort) {
    switch (motorPort) {
    case MOTOR_PORT.A:
        return buffer.readInt8(4);
    case MOTOR_PORT.B:
        return buffer.readInt8(16);
    case MOTOR_PORT.C:
        return buffer.readInt8(28);
    default:
        return buffer.readInt8(40);
    }
};

exports.getTachoCount = function (motorPort) {
    switch (motorPort) {
    case MOTOR_PORT.A:
        return buffer.readInt32LE(8);
    case MOTOR_PORT.B:
        return buffer.readInt32LE(20);
    case MOTOR_PORT.C:
        return buffer.readInt32LE(32);
    default:
        return buffer.readInt32LE(44);
    }
};
