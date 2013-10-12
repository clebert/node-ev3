'use strict';

function isInteger(number) {
    return number % 1 === 0;
}

function checkPort(value, name) {
    if (!isInteger(value) || value < 1 || value > 15) {
        throw new Error(
            'The argument for parameter <' + name + ':number> must be an ' +
            'integer in the range of 1 to 15.'
        );
    }
}

function checkSpeed(value, name) {
    if (!isInteger(value) || value < -100 || value > 100) {
        throw new Error(
            'The argument for parameter <' + name + ':number> must be an ' +
            'integer in the range of -100 to 100.'
        );
    }
}

Object.defineProperties(exports, {
    checkPort: {
        value: checkPort
    },
    checkSpeed: {
        value: checkSpeed
    }
});
