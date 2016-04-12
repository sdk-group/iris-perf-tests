'use strict'

function Z() {

  var A = require('./class.js');
  var fA = new A(10, 20);

  var make = (a, b) => (x) => x > a && x < b;


  function make2() {
    var a = 10;
    var b = 20;
    return function(x) {
      return x > a && x < b
    };
  }

  var f = make(10, 20);
  var f_t2 = make2();

  var f2 = function(a, b, x) {
    return x > a && x < b
  };
  var ft = f2.bind(f2, 10, 20);
  var iterations = 100000000;
  var fo = {
    a: 10,
    b: 20,
    f(x) {
      return x > this.a && x < this.b
    }
  };

  var ft2 = fo.f.bind(fo);

  var FC = function(a, b) {
    this.a = a;
    this.b = b;
  };
  FC.prototype.f = function(x) {
    return x > this.a && x < this.b
  };
  var fc = new FC(10, 20);

  //@NOTE: it's warmup
  function doStuff(i) {
    let q = i % 2;
    q = (i % 2) * 2;
  }
  for (var j = 0; j < 10; j += 1) {
    for (var i = 0; i < iterations; i += 1) {
      doStuff(i)
    }
  }

  var time = process.hrtime();
  for (var i = 0; i < iterations; i += 1) {
    f(i);
  }

  var diff = process.hrtime(time);

  console.log('%d nanoseconds > Make in arguments', diff[0] * 1e9 + diff[1]);

  time = process.hrtime();
  for (var i = 0; i < iterations; i += 1) {
    f_t2(i);
  }

  var diff = process.hrtime(time);

  console.log('%d nanoseconds > Make in scope', diff[0] * 1e9 + diff[1]);

  // time = process.hrtime();
  //
  // for (var i = 0; i < iterations; i += 1) {
  //   ft(i)
  // }
  //
  // diff = process.hrtime(time);
  // console.log('%d nanoseconds > BIND', diff[0] * 1e9 + diff[1]);
  //
  // time = process.hrtime();
  //
  // for (var i = 0; i < iterations; i += 1) {
  //   ft2(i)
  // }
  //
  // diff = process.hrtime(time);
  // console.log('%d nanoseconds > Obj BIND', diff[0] * 1e9 + diff[1]);

  // time = process.hrtime();
  //
  // for (var i = 0; i < iterations; i += 1) {
  //   fo.f(i)
  // }
  //
  // diff = process.hrtime(time);
  // console.log('%d nanoseconds > From Object', diff[0] * 1e9 + diff[1]);

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