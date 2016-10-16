# fn-switch
*a better functional javascript replacement for if statement and switch.*

**(this module does not use extra dependencies. It's 27 lines of code with spaces, minified size is 2KB)**

If you are like me writing if..statement (statement branching) and switch for ages, and most of the time repeating lines of codes over an over, good news is this will ease your burden in a relative terms.

## Usage
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

## Parameters
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

//function delagation with defaults
const _switch = c => ({error: 1})[c] || 0;

const _case = [ 
    {d: data, fn: extraFn }, 
    {d: exdata, fn: fallbackFn }
];

const input = document.getElementById('userInput').value; 

fnSwitch(_case, _switch(input))
    .switch()
    .map(case => {
    
        const ln = case.d.length;

        //specific expression base on selected case
        const res = case.fn(case.d);

        document.getElementById('result').innerHTML = res;

        //console.log(`current data length: ${ln}`, `\n${res}`);
    });

```
#### Sample Usage 2
A simple implementation where we want last 3 value from array to be the same.

```javascript
'use strict';

const fnSwitch = require('fn-switch');

const arrayFromElem = ['scissors', 'paper', 'paper', 'rock', 'rock', 'rock'];
// const arrayFromElem = ['rock', 'rock', 'rock', 'scissors', 'paper', 'paper', 'paper'];

const slice = array => array.slice(Math.max(array.length - 3, 1));

const uniq = [...new Set(slice(arrayFromElem))];

// return unique result, if length is more than 1 we return null
const resOne = uniq.length === 1 ? uniq[0] : null;

// the switch
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
    .map(case => case.r)
    .value();

console.log(res);
```

## Switch flavors

This a side note, preference is yours to choose. If you looking less verbose switch use function delegation with guards(&&) and defaults(||), else tenary operator can be good substitute for performance reason.

Most of your major overhead of codes lives down within the prototype chains. It's save to assume, the big difference here is how you implement the *switch*. There is 4 options: 
- *statement branching(if..else)*
- *guards(&&) and defaults(||)* 
- *ternary operator*
- *standard js switch*

### Statement brancing implementation
```javascript
const _switch = c => {
    if(c !== 'error') {
        return 0;
    } else {
        return 1;
    }
}
```
### Function Delegation with guards(&&) and defaults(||) implementation
```javascript
const _switch = c => {
    let v = {error: 1};
    return v[c] || 0;
}
```
it can be simplified into

```javascript
const _switch = c => ({error: 1})[c] || 0;
```

### Tenary operator implementation
```javascript
const _switch = c => c !== 'error' ? 0 : 1;
```

### Switch operator implementation
```javascript
const _switch = c => {
    switch(c) {
        case 'error':
            return 1;
            break;
        default:
            return 0;
    }
}
```
