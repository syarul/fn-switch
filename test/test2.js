'use strict';

const fnSwitch = require('../');

const data = [
    {first: 'John', last: 'Woods'},
    {first: 'Harry', last: 'Petty'}
];

const exdata = [1, 2, 3, 4];

const extraFn = d => `${d[0].first} ${d[0].last}`;

const fallbackFn = d => d.reduce((a, b) => a + b);

const _switch = c => c !== 'error' ? 0 : 1;

// const _switch = c => {
//     let v = {error: 1};
//     return v[c] || 0;
// }

// const _switch = c => ({error: 1})[c] || 0;

// const _switch = c => {
//     switch(c) {
//         case 'error':
//             return 1;
//             break;
//         default:
//             return 0;
//     }
// }

const _case = [ 
    {d: data, fn: extraFn }, 
    {d: exdata, fn: fallbackFn }
];

fnSwitch(_case, _switch('error2'))
    .switch()
    .map(_case => {
        const ln = _case.d.length;
        const res = _case.fn(_case.d);
        console.log(`current data length: ${ln}`, `\n${res}`);
    });