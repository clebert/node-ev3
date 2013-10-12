'use strict';

var typify = require('typeutil').typify;

function isInteger(number) {
    return number % 1 === 0;
}

function checkPort(number) {
    if (!isInteger(number) || number < 1 || number > 15) {
        throw new Error(
            'The argument for parameter <port:number> must be an integer in ' +
            'the range of 1 to 15.'
        );
    }
}

function checkSpeed(number) {
    if (!isInteger(number) || number < 0 || number > 100) {
        throw new Error(
            'The argument for parameter <speed:number> must be an integer in ' +
            'the range of 0 to 100.'
        );
    }
}

Object.defineProperties(exports, {
    checkPort: {
        value: typify(checkPort, '(number) => void')
    },
    checkSpeed: {
        value: typify(checkSpeed, '(number) => void')
    }
});
