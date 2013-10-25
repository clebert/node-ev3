'use strict';

var sizeByType;

sizeByType = {
    Int8: 1,
    Int16: 2,
    Int32: 4
};

function map(deviceName, length) {
    var mmap = require('../../native/node-mmap/mmap');

    return mmap.map(
        length,
        mmap.PROT_READ | mmap.PROT_WRITE,
        mmap.MAP_FILE | mmap.MAP_SHARED,
        require('fs').openSync(deviceName, 'rs+'),
        0
    );
}

exports.loadDevice = function (deviceName, deviceDescriptor, _map) {
    var device = {},
        length = 0,
        maxOffset = 0,
        buffer;

    Object.keys(deviceDescriptor).forEach(function (key) {
        var dataDescriptor = deviceDescriptor[key],
            method = 'read' + dataDescriptor.type + 'LE',
            offset = dataDescriptor.offset;

        if (offset > maxOffset) {
            length = offset + sizeByType[dataDescriptor.type];
            maxOffset = offset;
        }

        device[key] = function () {
            return buffer[method](offset);
        };
    });

    if (_map) {
        buffer = _map(deviceName, length);
    } else {
        buffer = map(deviceName, length);
    }

    return device;
};
