'use strict';

var $ = require('./device_constants'),
    device = require('./device'),
    buffer = device.map($.MOTOR_DEVICE_NAME, $.MOTOR_DEVICE_BUFFER_SIZE);

exports.getSpeed = function (port) {
    switch (port) {
    case $.MOTOR_A_PORT:
        return buffer.readInt8($.MOTOR_A_SPEED_OFFSET);
    case $.MOTOR_B_PORT:
        return buffer.readInt8($.MOTOR_B_SPEED_OFFSET);
    case $.MOTOR_C_PORT:
        return buffer.readInt8($.MOTOR_C_SPEED_OFFSET);
    default:
        return buffer.readInt8($.MOTOR_D_SPEED_OFFSET);
    }
};

exports.getTachoCount = function (port) {
    switch (port) {
    case $.MOTOR_A_PORT:
        return buffer.readInt32LE($.MOTOR_A_TACHO_COUNT_OFFSET);
    case $.MOTOR_B_PORT:
        return buffer.readInt32LE($.MOTOR_B_TACHO_COUNT_OFFSET);
    case $.MOTOR_C_PORT:
        return buffer.readInt32LE($.MOTOR_C_TACHO_COUNT_OFFSET);
    default:
        return buffer.readInt32LE($.MOTOR_D_TACHO_COUNT_OFFSET);
    }
};
