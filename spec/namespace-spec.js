
describe("namespace", function() {

  it("should create top-level object", function() {
    expect(ObjectB).toBeTruthy();
  });

  it("should create related objects", function() {
    expect(ObjectB.Spec).toBeTruthy();
    expect(ObjectB.Class).toBeTruthy();
  });

});
