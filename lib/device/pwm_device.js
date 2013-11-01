'use strict';

var DeviceWriter = require('./device_writer').DeviceWriter,
    deviceWriter = new DeviceWriter('/dev/lms_pwm');

exports.MOTOR_PORT = {
    A: 1,
    B: 2,
    C: 4,
    D: 8
};

/*
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.resetTachoCount = function (motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xB2, motorPorts
    ]), callback);
};

/*
 * polarity: [+-0..1] Polarity +-1, 0=toggle (multiplied to SPEED and POWER)
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPolarity = function (polarity, motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xA7, motorPorts, polarity
    ]), callback);
};

/*
 * power: [+-0..100%] Power relative to polarity
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPower = function (power, motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xA4, motorPorts, power
    ]), callback);
};

/*
 * speed: [+-0..100%] Speed relative to polarity (0->BRAKE)
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setSpeed = function (speed, motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xA5, motorPorts, speed
    ]), callback);
};

/*
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.start = function (motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xA6, motorPorts
    ]), callback);
};

/*
 * state: [boolean] State after stop (false=Coast, true=Brake)
 * motorPorts: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.stop = function (state, motorPorts, callback) {
    deviceWriter.write(new Buffer([
        0xA3, motorPorts, state ? 1 : 0
    ]), callback);
};
