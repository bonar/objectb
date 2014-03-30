
describe("Utility", function() {

  describe("ucfirst", function() {

    it("make first char upper case", function() {
      expect(ObjectB.ucfirst("foo")).toEqual("Foo");
      expect(ObjectB.ucfirst("name")).toEqual("Name");
      expect(ObjectB.ucfirst("Name")).toEqual("Name");
      expect(ObjectB.ucfirst("NAME")).toEqual("NAME");
    });

    it("returns upper case string for char", function() {
      expect(ObjectB.ucfirst("f")).toEqual("F");
    });

    it("returns empty string for empty string", function() {
      expect(ObjectB.ucfirst("")).toEqual("");
    });

  });

  describe("isObject", function() {

    it("returns true on object", function() {
      expect(ObjectB.isObject({})).toBeTruthy();
      expect(ObjectB.isObject([])).toBeFalsy();
      expect(ObjectB.isObject("")).toBeFalsy();
      expect(ObjectB.isObject(null)).toBeFalsy();
      expect(ObjectB.isObject(undefined)).toBeFalsy();
    });

  });

  describe("eachKV", function() {

    it("returns nothing with non-object argument", function() {
      var spiedFn = { callback: function(){} };
      spyOn(spiedFn, 'callback');

      var res = ObjectB.eachKV([], spiedFn.callback);

      expect(res).toBeUndefined();
      expect(spiedFn.callback).not.toHaveBeenCalled();
    });

    it("doesn't call given function with empty object", function() {
      var spiedFn = { callback: function(){} };
      spyOn(spiedFn, 'callback');

      var res = ObjectB.eachKV({}, spiedFn.callback);

      expect(res).toEqual({});
      expect(spiedFn.callback).not.toHaveBeenCalled();
    });

    it("iterates each key value", function() {
        var result = [];
        var test = {
          'name' : 'bonar',
          'age'  : 34 
        };
        ObjectB.eachKV(test, function(k, v) {
          result.push(k);
          result.push(v);
        });
        expect(result.length).toEqual(4);
        expect(result[0]).toEqual('name');
        expect(result[1]).toEqual('bonar');
        expect(result[2]).toEqual('age');
        expect(result[3]).toEqual(34);
    });

    it("returns iterated object", function() {
        var test = {
          'name' : 'bonar',
          'age'  : 34 
        };
        var res = ObjectB.eachKV(test, function(k, v) {});
        expect(res).toEqual(test);
    });

  });

  describe("extend", function() {

    it("does nothing with non-object argument", function() {
        var test = {};
        ObjectB.extend(test, "hoge");
        ObjectB.extend(test, 1);
        ObjectB.extend(test, null);

        expect(test).toEqual({});
    });

    it("merge keys", function() {
        var a = {
          1 : 'one',
          2 : 'two'
        };
        var b = {
          3 : 'three'
        };
        var c = {
          1 : 'ichi',
          3 : 'san'
        };

        expect(ObjectB.extend({}, a)).toEqual(a);

        var ab = ObjectB.extend(a, b);
        expect(ab).toEqual({
          1 : 'one',
          2 : 'two',
          3 : 'three'
        });

        expect(ObjectB.extend(ab, c)).toEqual({
          1 : 'ichi',
          2 : 'two',
          3 : 'san'
        });
    });

  });

});

