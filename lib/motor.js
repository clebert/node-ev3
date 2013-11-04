'use strict';

var motorDevice = require('./device/motor_device'),
    pwmDevice = require('./device/pwm_device'),
    PORT_BY_NAME = pwmDevice.PORT_BY_NAME;

function getPorts(portNames) {
    return portNames.split('').reduce(function (ports, portName) {
        return ports | (PORT_BY_NAME[portName] || 0);
    }, 0);
}

function normalize(speed) {
    speed = Math.round(speed / 10);

    if (speed < -100) {
        speed = -100;
    } else if (speed > 100) {
        speed = 100;
    }

    return speed;
}

exports.getSpeed = function (portName) {
    return motorDevice['getSpeed' + portName]()  * 10;
};

exports.setSpeed = function (speed, portNames, callback) {
    pwmDevice.setSpeed(normalize(speed), getPorts(portNames), callback);
};

exports.getTachoCount = function (portName) {
    return motorDevice['getTachoCount' + portName]();
};

exports.resetTachoCount = function (portNames, callback) {
    pwmDevice.resetTachoCount(getPorts(portNames), callback);
};

exports.start = function (portNames, callback) {
    pwmDevice.start(getPorts(portNames), callback);
};

exports.stop = function (portNames, callback) {
    pwmDevice.stop(false, getPorts(portNames), callback);
};

exports.stopAndBrake = function (portNames, callback) {
    pwmDevice.stop(true, getPorts(portNames), callback);
};
