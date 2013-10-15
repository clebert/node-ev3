'use strict';

var $ = require('./constants'),
    device = require('./device'),
    buffer = device.map($.MOTOR_DEVICE_NAME, $.MOTOR_DEVICE_BUFFER_LENGTH);

exports.getSpeed = function (port) {
    switch (port) {
    case $.MOTOR_PORT_A:
        return buffer.readInt8($.MOTOR_A_SPEED_OFFSET);
    case $.MOTOR_PORT_B:
        return buffer.readInt8($.MOTOR_B_SPEED_OFFSET);
    case $.MOTOR_PORT_C:
        return buffer.readInt8($.MOTOR_C_SPEED_OFFSET);
    default:
        return buffer.readInt8($.MOTOR_D_SPEED_OFFSET);
    }
};

exports.getTachoCount = function (port) {
    switch (port) {
    case $.MOTOR_PORT_A:
        return buffer.readInt32LE($.MOTOR_A_TACHO_COUNT_OFFSET);
    case $.MOTOR_PORT_B:
        return buffer.readInt32LE($.MOTOR_B_TACHO_COUNT_OFFSET);
    case $.MOTOR_PORT_C:
        return buffer.readInt32LE($.MOTOR_C_TACHO_COUNT_OFFSET);
    default:
        return buffer.readInt32LE($.MOTOR_D_TACHO_COUNT_OFFSET);
    }
};
