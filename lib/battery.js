'use strict';

var analogDevice = require('./device/analog_device');

function convert(value) {
    return (value * 5000) / (4095 * 1000);
}

exports.getVoltage = function () {
    var batteryCurrent = convert(analogDevice.getBatteryCurrent()),
        cell123456 = convert(analogDevice.getCell123456());

    return (cell123456 / 0.5) + (batteryCurrent / 22) + 0.05;
};
