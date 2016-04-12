'use strict'

function Z() {

	var A = require('./class.js');
	var fA = new A(10, 20);

	function make(a, b) {
		return function (x) {
			return x > a && x < b
		};
	}

	var f = make(10, 20);

	var f2 = function (a, b, x) {
		return x > a && x < b
	};
	var ft = f2.bind(f2, 10, 20);
	var iterations = 10000000;
	var fo = {
		a: 10,
		b: 20,
		f(x) {
			return x > this.a && x < this.b
		}
	};

	var ft2 = fo.f.bind(fo);

	var FC = function (a, b) {
		this.a = a;
		this.b = b;
	};
	FC.prototype.f = function (x) {
		return x > this.a && x < this.b
	};
	var fc = new FC(10, 20);

	var time = process.hrtime();
	for (var i = 0; i < iterations; i += 1) {
		f(i);
	}

	var diff = process.hrtime(time);


	time = process.hrtime();

	for (var i = 0; i < iterations; i += 1) {
		ft(i)
	}

	diff = process.hrtime(time);
	console.log('%d nanoseconds > BIND', diff[0] * 1e9 + diff[1]);

	time = process.hrtime();

	for (var i = 0; i < iterations; i += 1) {
		ft2(i)
	}

	diff = process.hrtime(time);
	console.log('%d nanoseconds > Obj BIND', diff[0] * 1e9 + diff[1]);

	time = process.hrtime();

	for (var i = 0; i < iterations; i += 1) {
		fo.f(i)
	}

	diff = process.hrtime(time);
	console.log('%d nanoseconds > From Object', diff[0] * 1e9 + diff[1]);

	time = process.hrtime();

	for (var i = 0; i < iterations; i += 1) {
		fc.f(i)
	}

	diff = process.hrtime(time);
	console.log('%d nanoseconds > From constructor', diff[0] * 1e9 + diff[1]);

	time = process.hrtime();

	for (var i = 0; i < iterations; i += 1) {
		fA.f(i)
	}

	diff = process.hrtime(time);
	console.log('%d nanoseconds > From A', diff[0] * 1e9 + diff[1]);
};

Z();