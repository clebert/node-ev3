'use strict';

var device = require('./device'),
    buffer = device.map('/dev/lms_analog', 32);

function convert(value) {
    return (value * 5000) / (4095 * 1000);
}

/*
 * Current flowing from the battery
 */
function getBatteryCurrent() {
    return buffer.readInt16LE(28);
}

/*
 * Voltage at battery cell 1, 2, 3, 4, 5, and 6
 */
function getCell123456() {
    return buffer.readInt16LE(30);
}

exports.getVoltage = function () {
    var batteryCurrent = convert(getBatteryCurrent()),
        cell123456 = convert(getCell123456());

    return (cell123456 / 0.5) + (batteryCurrent / 22) + 0.05;
};
