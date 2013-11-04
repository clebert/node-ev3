'use strict';

var motorDevice = require('./device/motor_device'),
    pwmDevice = require('./device/pwm_device'),
    typify = require('typeutil').typify,
    PORT_BY_NAME = pwmDevice.PORT_BY_NAME;

function normalize(value, min, max) {
    value = isNaN(value) ? 0 : Math.round(value);

    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

exports.Motor = typify(function Motor(portNames) {
    var ports;

    if (!(this instanceof Motor)) {
        return new Motor(portNames);
    }

    ports = portNames.split('').reduce(function (ports, portName) {
        return ports | (PORT_BY_NAME[portName] || 0);
    }, 0);

    this.resetTachoCount = typify(function resetTachoCount(callback) {
        pwmDevice.resetTachoCount(ports, callback);
    }, '([Function]) => void');

    this.setPolarity = typify(function setPolarity(polarity, callback) {
        pwmDevice.setPolarity(normalize(polarity, -1, 1), ports, callback);
    }, '(number[, Function]) => void');

    this.setPower = typify(function setPower(power, callback) {
        pwmDevice.setPower(normalize(power, -100, 100), ports, callback);
    }, '(number[, Function]) => void');

    this.setSpeed = typify(function setSpeed(speed, callback) {
        pwmDevice.setSpeed(normalize(speed / 10, -100, 100), ports, callback);
    }, '(number[, Function]) => void');

    this.start = typify(function start(callback) {
        pwmDevice.start(ports, callback);
    }, '([Function]) => void');

    this.stop = typify(function stop(callback) {
        pwmDevice.stop(false, ports, callback);
    }, '([Function]) => void');

    this.stopAndBrake = typify(function stopAndBrake(callback) {
        pwmDevice.stop(true, ports, callback);
    }, '([Function]) => void');
}, '(string) => Object');

exports.Motor.getSpeed = typify(function (portName) {
    var getSpeed = motorDevice['getSpeed' + portName];

    if (getSpeed) {
        return getSpeed() * 10;
    }
}, '(string) => [number]');

exports.Motor.getTachoCount = typify(function (portName) {
    var getTachoCount = motorDevice['getTachoCount' + portName];

    if (getTachoCount) {
        return getTachoCount();
    }
}, '(string) => [number]');
