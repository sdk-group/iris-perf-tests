'use strict'

class A {
	constructor(a, b) {
		let x = 'wahahaa';
		this.a = a;
		this.b = b;
	}
	f(x) {
		let test = x;
		return test > this.a && test < this.b
	}
}


module.exports = A;