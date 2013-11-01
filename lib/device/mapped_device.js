'use strict';

var fs = require('fs'),
    mmap = require('../../native/node-mmap/mmap');

function calculateLength(descriptor) {
    return Math.max.apply(Math, Object.keys(descriptor).map(function (key) {
        var data = descriptor[key];

        return data.offset + parseInt(data.type.slice(3), 10) / 8;
    }));
}

function map(name, descriptor) {
    var fd = fs.openSync(name, 'rs+');

    return mmap.map(
        calculateLength(descriptor),
        mmap.PROT_READ | mmap.PROT_WRITE,
        mmap.MAP_FILE | mmap.MAP_SHARED,
        fd,
        0
    );
}

function MappedDevice(name, descriptor) {
    var buffer = map(name, descriptor);

    Object.keys(descriptor).forEach(function (key) {
        var data = descriptor[key],
            method = 'read' + data.type,
            offset = data.offset;

        if (data.type !== 'Int8') {
            method += 'LE';
        }

        this['get' + key.charAt(0).toUpperCase() + key.slice(1)] = function () {
            return buffer[method](offset);
        };
    }.bind(this));
}

exports.MappedDevice = MappedDevice;
