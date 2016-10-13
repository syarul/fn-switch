# fn-switch
*a better functional javascript replacement for if statement and switch.*

If you are like me writing if..statement and switch for ages, and most of the time repeating lines of codes over an over, good news is this will ease your burden in a relative terms. 

## Usage:
to install

``` npm install fn-switch```

As node modules
```javascript
var fnSwitch = require('fn-switch')
```
Usage for browser look in **dist** folder
```html
  <script src="node_modules/fn-switch/dist/fn-switch.min.js"></script>

<script>
  var fnSwitch = window.fnSwitch;
</script>
```
#### Paramenters
```javascript
fnSwitch(casses, switcher, default)
```
- **casses**: *(object)* must be an array, is the list of casses for switching base on switcher.
- **switcher**: value assign as array index, see sample on how implement this.
- **default**: the default value to return if all switches failed, optional which will return null.

To get the output, you need to assign prototype chain to the function which availabe as ```switch``` and ```value```.

```fnSwitch(casses, switcher, default).switch()``` will cast one of the casses as an array, which allow prototype chaining, and can be extends further with ```Array.prototype.map```(see sample usage). As for ```fnSwitch(casses, switcher, default).value()```will return the actual result.

#### Sample Usage 1
```javascript
'use strict';

const fnSwitch = require('fn-switch');

const data = [
    {first: 'John', last: 'Woods'},
    {first: 'Harry', last: 'Petty'}
];

const exdata = [1, 2, 3, 4];

const extraFn = d => `${d[0].first} ${d[0].last}`;

const fallbackFn = d => d.reduce((a, b) => a + b);

const _switch = c => c !== 'error' ? 0 : 1;

const _case = [ 
    {d: data, fn: extraFn }, 
    {d: exdata, fn: fallbackFn }
];

//we assign some predefine selector 'someStringNotError'
fnSwitch(_case, _switch('someStringNotError'))
    .switch()
    .map(_case => {
    
        //general function
        const ln = _case.d.length;

        //specific function base on selected case
        const res = _case.fn(_case.d);

        console.log(`current data length: ${ln}`, `\n${res}`);
    });

```

#### Sample Usage 2

```javascript
'use strict';

const fnSwitch = require('fn-switch');

// a simple implementation where we want last 3 value from array to be the same
const arrayFromElem = ['scissors', 'paper', 'paper', 'rock', 'rock', 'rock'];
// const arrayFromElem = ['rock', 'rock', 'rock', 'scissors', 'paper', 'paper', 'paper'];

const slice = array => array.slice(Math.max(array.length - 3, 1));

const uniq = [...new Set(slice(arrayFromElem))];

// return unique result, if length is more than 1 we return null
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
    .map(f => f.r)
    .value();

console.log(res);
```
