'use strict';

const fnSwitch = require('../');

// a simple implementation where we want last 3 value from array to be the same
const arrayFromElem = ['scissors', 'paper', 'paper', 'rock', 'rock', 'rock'];
// const arrayFromElem = ['rock', 'rock', 'rock', 'scissors', 'paper', 'paper', 'paper'];

const slice = array => array.slice(Math.max(array.length - 3, 1));

const uniq = [...new Set(slice(arrayFromElem))];

// return unique result, if length is more than 1 we return an empty array
const resOne = uniq.length === 1 ? uniq[0] : null;

// the switcher
const _switch = r =>
    r === 'rock' ? 0 : 
    r === 'paper' ? 1 : 
    r === 'scissors' ? 2 : 
    3; // we want to map this to actual value, if not leave it as a null

const _case = [
    {r: 'paper win!!'},
    {r: 'scissors win!!'},
    {r: 'rock win!!'},
    {r: 'no one win yet, repeat'}
];

const res = fnSwitch(_case, _switch(resOne))
    .switch()
    .map(f => f.r) // we can write more inside this
    .value();

console.log(res);