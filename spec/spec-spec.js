
describe("ObjectB.Spec", function() {

  it("has constructor", function() {
    expect(ObjectB.Spec).toBeTruthy();
  });

  it("can be created by new", function() {
    var spec = new ObjectB.Spec();
    expect(typeof spec).toEqual('object');

    spec.classMethod({
      getA: function() { return "A"; },
      getB: function() { return "B"; }
    });
    expect((spec.classMethod()).getA()).toEqual("A");
    expect((spec.classMethod()).getB()).toEqual("B");

    spec.classAttr({
      numberA: 123,
      numberB: 456
    });
    expect((spec.classAttr()).numberA).toEqual(123);
    expect((spec.classAttr()).numberB).toEqual(456);

  });

});

