'use strict';

function fnSwitch(cases, switcher, _default) {
	if (!Array.isArray(cases)) throw new Error('Unable to enumerate arguments, object is not an array');
	if (!Array.prototype.value) {
		Object.defineProperty(Array.prototype, 'value', {
			enumerable: false,
			value() {
				return [].concat(this)[0];
			}
		});
	}
	_default = _default || null;
	const _switchCase = (sources, defaultSource) => selector => sources[selector] || defaultSource;
	const _cArray = argv => [argv];
	const _cases = cases.reduce((f, cur, idx) => {
		f[idx] = cur;
		return f;
	}, {});
	const cArray = _cArray(switcher);
	const fn = {};
	fn.switch = () => cArray.map(_switchCase(_cases, _default));
	fn.value = () => cArray.map(_switchCase(_cases, _default)).value();
	return fn;
}

module.exports = fnSwitch;