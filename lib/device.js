'use strict';

var fs = require('fs'),
    mmap = require('../native/node-mmap/mmap');

exports.map = function (name, length) {
    var protection = mmap.PROT_READ | mmap.PROT_WRITE,
        flags = mmap.MAP_FILE | mmap.MAP_SHARED;

    return mmap.map(length, protection, flags, fs.openSync(name, 'rs+'), 0);
};

exports.writer = function (name) {
    var fd = fs.openSync(name, 'r+');

    return function (buffer, callback) {
        if (callback) {
            fs.write(fd, buffer, 0, buffer.length, 0, function (error) {
                callback(error);
            });
        } else {
            fs.writeSync(fd, buffer, 0, buffer.length, 0);
        }
    };
};
