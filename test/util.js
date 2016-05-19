var ObjectB = require('../objectb');
var chai = require('chai')
var expect = chai.expect;
chai.use(require('chai-spies'));

describe("Utility", function() {

  describe("ucfirst", function() {

    it("make first char upper case", function() {
      expect(ObjectB.ucfirst("foo")).to.equal("Foo");
      expect(ObjectB.ucfirst("name")).to.equal("Name");
      expect(ObjectB.ucfirst("Name")).to.equal("Name");
      expect(ObjectB.ucfirst("NAME")).to.equal("NAME");
    });

    it("returns upper case string for char", function() {
      expect(ObjectB.ucfirst("f")).to.equal("F");
    });

    it("returns empty string for empty string", function() {
      expect(ObjectB.ucfirst("")).to.equal("");
    });

  });

  describe("isObject", function() {

    it("returns true on object", function() {
      expect(ObjectB.isObject({})).to.equal(true);
      expect(ObjectB.isObject([])).to.equal(false);
      expect(ObjectB.isObject("")).to.equal(false);
      expect(ObjectB.isObject(null)).to.equal(false);
      expect(ObjectB.isObject(undefined)).to.equal(false);
    });

  });

  describe("eachKV", function() {

    it("returns nothing with non-object argument", function() {
      var spiedFn = { callback: function(){} };
      chai.spy.on(spiedFn, 'callback');

      ObjectB.eachKV([], spiedFn.callback);
      expect(spiedFn.callback).not.have.been.called();
    });

    it("doesn't call given function with empty object", function() {
      var spiedFn = { callback: function(){} };
      chai.spy.on(spiedFn, 'callback');

      ObjectB.eachKV({}, spiedFn.callback);
      expect(spiedFn.callback).not.have.been.called();
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
        expect(result).to.have.length(4);
        expect(result[0]).to.equal('name');
        expect(result[1]).to.equal('bonar');
        expect(result[2]).to.equal('age');
        expect(result[3]).to.equal(34);
    });

    it("returns iterated object", function() {
        var test = {
          'name' : 'bonar',
          'age'  : 34 
        };
        var res = ObjectB.eachKV(test, function(k, v) {});
        expect(res).to.equal(test);
    });

  });

  describe("extend", function() {

    it("does nothing with non-object argument", function() {
        var test = {};
        ObjectB.extend(test, "hoge");
        ObjectB.extend(test, 1);
        ObjectB.extend(test, null);

        expect(test).to.deep.equal({});
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

        expect(ObjectB.extend({}, a)).to.deep.equal(a);

        var ab = ObjectB.extend(a, b);
        expect(ab).to.deep.equal({
          1 : 'one',
          2 : 'two',
          3 : 'three'
        });

        expect(ObjectB.extend(ab, c)).to.deep.equal({
          1 : 'ichi',
          2 : 'two',
          3 : 'san'
        });
    });

  });

});

