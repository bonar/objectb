var ObjectB = require('../objectb');
var chai = require('chai')
var expect = chai.expect;

describe("ObjectB.Spec", function() {

  it("has constructor", function() {
    expect(ObjectB.Spec).to.be.ok;
  });

  it("can be created by new", function() {
    var spec = new ObjectB.Spec();
    expect(typeof spec).to.equal('object');

    spec.classMethod({
      getA: function() { return "A"; },
      getB: function() { return "B"; }
    });
    expect((spec.classMethod()).getA()).to.equal("A");
    expect((spec.classMethod()).getB()).to.equal("B");

    spec.classAttr({
      numberA: 123,
      numberB: 456
    });
    expect((spec.classAttr()).numberA).to.equal(123);
    expect((spec.classAttr()).numberB).to.equal(456);

  });

});

