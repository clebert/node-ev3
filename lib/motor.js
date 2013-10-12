'use strict';

var fs = require('fs'),
    mmap = require('../native/node-mmap/mmap'),
    typify = require('typeutil').typify,
    util = require('./util'),
    motorFd = fs.openSync('/dev/lms_motor', 'rs+'),
    pwmFd = fs.openSync('/dev/lms_pwm', 'r+'),
    motorBuffer;

motorBuffer = mmap.map(
    48,
    mmap.PROT_READ | mmap.PROT_WRITE,
    mmap.MAP_FILE | mmap.MAP_SHARED,
    motorFd,
    0
);

function getSpeed() {
    return {
        1: motorBuffer.readInt32LE(4),
        2: motorBuffer.readInt32LE(16),
        4: motorBuffer.readInt32LE(28),
        8: motorBuffer.readInt32LE(40),
    };
}

function getTachoCount() {
    return {
        1: motorBuffer.readInt32LE(8),
        2: motorBuffer.readInt32LE(20),
        4: motorBuffer.readInt32LE(32),
        8: motorBuffer.readInt32LE(44),
    };
}

function resetTachoCount(port, callback) {
    var buffer = new Buffer(2);

    util.checkPort(port, 'port');

    buffer[0] = 0xB2; // opOUTPUT_CLR_COUNT
    buffer[1] = port;

    fs.write(pwmFd, buffer, 0, 2, 0, function (error) {
        callback(error);
    });
}

function setSpeed(value, port, callback) {
    var buffer = new Buffer(3);

    util.checkSpeed(value, 'value');
    util.checkPort(port, 'port');

    buffer[0] = 0xA5; // opOUTPUT_SPEED
    buffer[1] = port;
    buffer[2] = value;

    fs.write(pwmFd, buffer, 0, 3, 0, function (error) {
        callback(error);
    });
}

function start(port, callback) {
    var buffer = new Buffer(2);

    util.checkPort(port, 'port');

    buffer[0] = 0xA6; // opOUTPUT_START
    buffer[1] = port;

    fs.write(pwmFd, buffer, 0, 2, 0, function (error) {
        callback(error);
    });
}

function stop(coast, port, callback) {
    var buffer = new Buffer(3);

    util.checkPort(port, 'port');

    buffer[0] = 0xA3; // opOUTPUT_STOP
    buffer[1] = port;
    buffer[2] = coast ? 0 : 1;

    fs.write(pwmFd, buffer, 0, 3, 0, function (error) {
        callback(error);
    });
}

function brake(port, callback) {
    stop(false, port, callback);
}

function coast(port, callback) {
    stop(true, port, callback);
}

Object.defineProperties(exports, {
    brake: {
        value: typify(brake, '(number, Function) => void')
    },
    coast: {
        value: typify(coast, '(number, Function) => void')
    },
    getSpeed: {
        value: typify(getSpeed, '() => Object')
    },
    getTachoCount: {
        value: typify(getTachoCount, '() => Object')
    },
    portA: {
        value: 0x01 // 0001
    },
    portB: {
        value: 0x02 // 0010
    },
    portC: {
        value: 0x04 // 0100
    },
    portD: {
        value: 0x08 // 1000
    },
    resetTachoCount: {
        value: typify(resetTachoCount, '(number, Function) => void')
    },
    setSpeed: {
        value: typify(setSpeed, '(number, number, Function) => void')
    },
    start: {
        value: typify(start, '(number, Function) => void')
    },
    stop: {
        value: typify(stop, '(boolean, number, Function) => void')
    }
});
