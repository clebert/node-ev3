/* global suite, test */

'use strict';

var assert = require('assert'),
    device = require('../lib/device/device'),
    testUtil = require('./test_util');

suite('analog_device', function () {
    var bufferSize = 32;

    function getAnalogDevice(buffer) {
        device.map = function map(name, length) {
            assert.strictEqual(name, '/dev/lms_analog');
            assert.strictEqual(length, bufferSize);

            return buffer;
        };

        return testUtil.reloadModule('../lib/device/analog_device');
    }

    suite('.getVoltage() => number', function () {

        test('should return 7.548945498945499', function () {
            var buffer = testUtil.createBuffer(bufferSize),
                analogDevice = getAnalogDevice(buffer);

            buffer[28] = 124;
            buffer[29] = 0;
            buffer[30] = 252;
            buffer[31] = 11;

            assert.strictEqual(analogDevice.getVoltage(), 7.548945498945499);
        });

        test('should return 8.73043068043068', function () {
            var buffer = testUtil.createBuffer(bufferSize),
                analogDevice = getAnalogDevice(buffer);

            buffer[28] = 36;
            buffer[29] = 1;
            buffer[30] = 220;
            buffer[31] = 13;

            assert.strictEqual(analogDevice.getVoltage(), 8.73043068043068);
        });

        test('should return 9.062321012321013', function () {
            var buffer = testUtil.createBuffer(bufferSize),
                analogDevice = getAnalogDevice(buffer);

            buffer[28] = 112;
            buffer[29] = 0;
            buffer[30] = 104;
            buffer[31] = 14;

            assert.strictEqual(analogDevice.getVoltage(), 9.062321012321013);
        });
    });
});
