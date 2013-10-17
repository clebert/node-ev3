'use strict';

var device = require('./device'),
    write = device.writer('/dev/lms_pwm');

/*
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.resetTachoCount = function (ports, callback) {
    var buffer = new Buffer(2);

    buffer[0] = 0xB2;
    buffer[1] = ports;

    write(buffer, callback);
};

/*
 * polarity: [+-0..1]     Polarity +-1, 0=toggle (multiplied to SPEED and POWER)
 * ports:    [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPolarity = function (polarity, ports, callback) {
    var buffer = new Buffer(3);

    buffer[0] = 0xA7;
    buffer[1] = ports;
    buffer[2] = polarity;

    write(buffer, callback);
};

/*
 * power: [+-0..100%]  Power relative to polarity
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setPower = function (power, ports, callback) {
    var buffer = new Buffer(3);

    buffer[0] = 0xA4;
    buffer[1] = ports;
    buffer[2] = power;

    write(buffer, callback);
};

/*
 * speed: [+-0..100%]  Speed relative to polarity (0->BRAKE)
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.setSpeed = function (speed, ports, callback) {
    var buffer = new Buffer(3);

    buffer[0] = 0xA5;
    buffer[1] = ports;
    buffer[2] = speed;

    write(buffer, callback);
};

/*
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.start = function (ports, callback) {
    var buffer = new Buffer(2);

    buffer[0] = 0xA6;
    buffer[1] = ports;

    write(buffer, callback);
};

/*
 * state: [0..1]       State after stop (0=Coast, 1=Brake)
 * ports: [0x00..0x0F] Bit field representing motor port A to D
 */
exports.stop = function (state, ports, callback) {
    var buffer = new Buffer(3);

    buffer[0] = 0xA3;
    buffer[1] = ports;
    buffer[2] = state;

    write(buffer, callback);
};
