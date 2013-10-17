'use strict';

var fs = require('fs'),
    mmap;

if (process.env.NODE_ENV === 'test') {
    return;
}

mmap = require('../../native/node-mmap/mmap');

exports.map = function (name, length) {
    return mmap.map(
        length,
        mmap.PROT_READ | mmap.PROT_WRITE,
        mmap.MAP_FILE | mmap.MAP_SHARED,
        fs.openSync(name, 'rs+'),
        0
    );
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
