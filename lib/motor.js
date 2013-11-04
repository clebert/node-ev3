'use strict';

var motorDevice = require('./device/motor_device'),
    pwmDevice = require('./device/pwm_device'),
    PORT_BY_NAME = pwmDevice.PORT_BY_NAME;

function normalize(speed) {
    speed = Math.round(speed / 10);

    if (speed < -100) {
        speed = -100;
    } else if (speed > 100) {
        speed = 100;
    }

    return speed;
}

function Motor(portNames) {
    var ports;

    ports = portNames.split('').reduce(function (ports, portName) {
        return ports | (PORT_BY_NAME[portName] || 0);
    }, 0);

    this.resetTachoCount = function (callback) {
        pwmDevice.resetTachoCount(ports, callback);
    };

    this.setSpeed = function (speed, callback) {
        pwmDevice.setSpeed(normalize(speed), ports, callback);
    };

    this.start = function (callback) {
        pwmDevice.start(ports, callback);
    };

    this.stop = function (callback) {
        pwmDevice.stop(false, ports, callback);
    };

    this.stopAndBrake = function (callback) {
        pwmDevice.stop(true, ports, callback);
    };
}

exports.Motor = Motor;

Motor.getSpeed = function (portName) {
    return motorDevice['getSpeed' + portName]() * 10;
};

Motor.getTachoCount = function (portName) {
    return motorDevice['getTachoCount' + portName]();
};
