'use strict';

var motorDevice = require('./device/motor_device'),
    pwmDevice = require('./device/pwm_device'),
    NAME_TO_PORT = pwmDevice.NAME_TO_PORT;

function Motor(portNames) {
    this.ports = portNames.split('').reduce(function (ports, portName) {
        return ports | (NAME_TO_PORT[portName] || 0);
    }, 0);
}

exports.Motor = Motor;

Motor.getSpeed = function (portName) {
    return motorDevice['getSpeed' + portName]() * 10;
};

Motor.getTachoCount = function (portName) {
    return motorDevice['getTachoCount' + portName]();
};

Motor.prototype.resetTachoCount = function (callback) {
    pwmDevice.resetTachoCount(this.ports, callback);
};

Motor.prototype.setPolarity = function (polarity, callback) {
    pwmDevice.setPolarity(polarity, this.ports, callback);
};

Motor.prototype.setPower = function (power, callback) {
    pwmDevice.setPower(power, this.ports, callback);
};

Motor.prototype.setSpeed = function (speed, callback) {
    pwmDevice.setSpeed(Math.round(speed / 10), this.ports, callback);
};

Motor.prototype.start = function (callback) {
    pwmDevice.start(this.ports, callback);
};

Motor.prototype.stop = function (callback) {
    pwmDevice.stop(false, this.ports, callback);
};

Motor.prototype.stopAndBrake = function (callback) {
    pwmDevice.stop(true, this.ports, callback);
};
