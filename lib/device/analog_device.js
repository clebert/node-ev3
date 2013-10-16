'use strict';

var $ = require('./device_constants'),
    device = require('./device'),
    buffer = device.map($.ANALOG_DEVICE_NAME, $.ANALOG_DEVICE_BUFFER_SIZE);

function convert(value) {
    return (value * $.ANALOG_ADC_REF) / ($.ANALOG_ADC_RES * 1000);
}

/*
 * Current flowing from the battery
 */
function getBatteryCurrent() {
    return buffer.readInt16LE($.ANALOG_BATTERY_CURRENT_OFFSET);
}

/*
 * Voltage at battery cell 1, 2, 3, 4, 5, and 6
 */
function getCell123456() {
    return buffer.readInt16LE($.ANALOG_CELL123456_OFFSET);
}

exports.getVoltage = function () {
    var batteryCurrent = convert(getBatteryCurrent()),
        cell123456 = convert(getCell123456());

    return (cell123456 / $.ANALOG_AMP_VIN) +
        (batteryCurrent / $.ANALOG_AMP_CIN) + $.ANALOG_VCE;
};
