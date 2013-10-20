'use strict';

var path = require('path');

exports.reloadModule = function (id) {
    var filename = path.resolve(__dirname, id + '.js');

    delete require.cache[filename];

    return require(id);
};

exports.createBuffer = function (size) {
    var buffer = new Buffer(size);

    buffer.fill(0);

    return buffer;
};
