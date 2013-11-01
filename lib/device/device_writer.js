'use strict';

var fs = require('fs');

function DeviceWriter(name) {
    var fd = fs.openSync(name, 'r+');

    this.write = function (buffer, callback) {
        if (callback) {
            fs.write(fd, buffer, 0, buffer.length, 0, callback);
        } else {
            fs.writeSync(fd, buffer, 0, buffer.length, 0);
        }
    };
}

exports.DeviceWriter = DeviceWriter;
