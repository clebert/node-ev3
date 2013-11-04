'use strict';

var DeviceWriter = require('./device_writer').DeviceWriter,
    deviceWriter = new DeviceWriter('/dev/lms_pwm');

exports.NAME_TO_PORT = {
    A: 1,
    B: 2,
    C: 4,
    D: 8
};

/*
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.resetTachoCount = function (ports, callback) {
    deviceWriter.write(new Buffer([
        0xB2, ports
    ]), callback);
};

/*
 * polarity: [+-0..1] Polarity +-1, 0=toggle (multiplied to SPEED and POWER)
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPolarity = function (polarity, ports, callback) {
    deviceWriter.write(new Buffer([
        0xA7, ports, polarity
    ]), callback);
};

/*
 * power: [+-0..100%] Power relative to polarity
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPower = function (power, ports, callback) {
    deviceWriter.write(new Buffer([
        0xA4, ports, power
    ]), callback);
};

/*
 * speed: [+-0..100%] Speed relative to polarity (0->BRAKE)
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setSpeed = function (speed, ports, callback) {
    deviceWriter.write(new Buffer([
        0xA5, ports, speed
    ]), callback);
};

/*
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.start = function (ports, callback) {
    deviceWriter.write(new Buffer([
        0xA6, ports
    ]), callback);
};

/*
 * state: [boolean] State after stop (false=Coast, true=Brake)
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.stop = function (state, ports, callback) {
    deviceWriter.write(new Buffer([
        0xA3, ports, state ? 1 : 0
    ]), callback);
};
