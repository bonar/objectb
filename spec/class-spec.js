
describe('ObjectB.Class', function() {

  describe('define', function() {

    var myClass = new ObjectB.Class.define(
      'myClass', function() {});

    var otherClass = new ObjectB.Class.define(
      'otherClass', function() {});

    it('creates constructor', function() {
      expect(typeof myClass).toEqual('function');
    });

    it('constructor knows its own name', function() {
      expect(myClass.getName()).toEqual('myClass');
    });

    it('tells whether it isa() given class', function() {
      expect(myClass.isa('myClass')).toBeTruthy();
      expect(myClass.isa(myClass)).toBeTruthy();

      expect(myClass.isa('otherClass')).toBeFalsy();
      expect(myClass.isa(otherClass)).toBeFalsy();
    });

    describe('instance', function() {

      var instance = new myClass();

      it('is typeof object', function() {
        expect(typeof instance).toEqual('object');
      });

      it('is onstanceof myClass', function() {
        expect(instance instanceof myClass).toBeTruthy();
      });

      it('isa() tells whether its a instance of given class', function() {
        expect(instance.isa('myClass')).toBeTruthy();
        expect(instance.isa(myClass)).toBeTruthy();

        expect(instance.isa('otherClass')).toBeFalsy();
        expect(instance.isa(otherClass)).toBeFalsy();
      });

    });

  });

});
