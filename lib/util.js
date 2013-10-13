'use strict';

exports.checkIsInRange = function (value, name, min, max) {
    if (!(value % 1 === 0 && value >= min && value <= max)) {
        throw new Error(
            'The argument for parameter <' + name + '> must be an integer in ' +
            'the range of ' + min + ' to ' + max + '.'
        );
    }
};
