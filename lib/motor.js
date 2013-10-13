'use strict';

var device = require('./device'),
    typify = require('typeutil').typify,
    util = require('./util'),
    motorBuffer = device.map('/dev/lms_motor', 48),
    pwmWriter = device.writer('/dev/lms_pwm');

function getSpeed() {
    return {
        1: motorBuffer.readInt8(4),
        2: motorBuffer.readInt8(16),
        4: motorBuffer.readInt8(28),
        8: motorBuffer.readInt8(40)
    };
}

function getTachoCount() { // updates about every 10 ms
    return {
        1: motorBuffer.readInt32LE(8),
        2: motorBuffer.readInt32LE(20),
        4: motorBuffer.readInt32LE(32),
        8: motorBuffer.readInt32LE(44)
    };
}

function resetTachoCount(port, callback) {
    var buffer = new Buffer(2);

    util.checkIsInRange(port, 'port', 1, 15);

    buffer[0] = 0xB2; // opOUTPUT_CLR_COUNT
    buffer[1] = port;

    pwmWriter.write(buffer, callback);
}

/*
 * -1 makes the motor run backward
 *  1 makes the motor run forward
 *  0 makes the motor run the opposite direction
 */
function setPolarity(port, polarity, callback) {
    var buffer = new Buffer(3);

    util.checkIsInRange(port, 'port', 1, 15);
    util.checkIsInRange(polarity, 'polarity', -1, 1);

    buffer[0] = 0xA7; // opOUTPUT_POLARITY
    buffer[1] = port;
    buffer[2] = polarity;

    pwmWriter.write(buffer, callback);
}

function setPower(port, power, callback) {
    var buffer = new Buffer(3);

    util.checkIsInRange(port, 'port', 1, 15);
    util.checkIsInRange(power, 'power', -100, 100);

    buffer[0] = 0xA4; // opOUTPUT_POWER
    buffer[1] = port;
    buffer[2] = power;

    pwmWriter.write(buffer, callback);
}

function setSpeed(port, speed, callback) {
    var buffer = new Buffer(3);

    util.checkIsInRange(port, 'port', 1, 15);
    util.checkIsInRange(speed, 'speed', -100, 100);

    buffer[0] = 0xA5; // opOUTPUT_SPEED
    buffer[1] = port;
    buffer[2] = speed;

    pwmWriter.write(buffer, callback);
}

function start(port, callback) {
    var buffer = new Buffer(2);

    util.checkIsInRange(port, 'port', 1, 15);

    buffer[0] = 0xA6; // opOUTPUT_START
    buffer[1] = port;

    pwmWriter.write(buffer, callback);
}

function stop(port, coast, callback) {
    var buffer = new Buffer(3);

    util.checkIsInRange(port, 'port', 1, 15);

    buffer[0] = 0xA3; // opOUTPUT_STOP
    buffer[1] = port;
    buffer[2] = coast ? 0 : 1;

    pwmWriter.write(buffer, callback);
}

Object.defineProperties(exports, {
    PORT_A: {
        value: 0x01 // 0001
    },
    PORT_B: {
        value: 0x02 // 0010
    },
    PORT_C: {
        value: 0x04 // 0100
    },
    PORT_D: {
        value: 0x08 // 1000
    },
    getSpeed: {
        value: typify(getSpeed, '() => Object')
    },
    getTachoCount: {
        value: typify(getTachoCount, '() => Object')
    },
    resetTachoCount: {
        value: typify(resetTachoCount, '(number[, Function]) => void')
    },
    setPolarity: {
        value: typify(setPolarity, '(number, number[, Function]) => void')
    },
    setPower: {
        value: typify(setPower, '(number, number[, Function]) => void')
    },
    setSpeed: {
        value: typify(setSpeed, '(number, number[, Function]) => void')
    },
    start: {
        value: typify(start, '(number[, Function]) => void')
    },
    stop: {
        value: typify(stop, '(number[, boolean[, Function]]) => void')
    }
});
