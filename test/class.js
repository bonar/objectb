var ObjectB = require('../objectb');
var chai = require('chai')
var expect = chai.expect;

var util = require('util');

describe('ObjectB.Class', function() {

  describe('define', function() {

    var myClass = new ObjectB.Class.define(
      'myClass', function() {});

    var otherClass = new ObjectB.Class.define(
      'otherClass', function() {});

    it('creates constructor', function() {
      expect(typeof myClass).to.equal('function');
    });

    it('constructor knows its own name', function() {
      expect(myClass.getName()).to.equal('myClass');
    });

    it('tells whether it isa() given class', function() {
      expect(myClass.isa('myClass')).to.be.ok;
      expect(myClass.isa(myClass)).to.be.ok;

      expect(myClass.isa('otherClass')).to.be.false;
      expect(myClass.isa(otherClass)).to.be.false;
    });

    describe('class type detection', function() {

      var instance = new myClass();

      it('is typeof object', function() {
        expect(typeof instance).to.equal('object');
      });

      it('is onstanceof myClass', function() {
        expect(instance instanceof myClass).to.be.ok;
      });

      it('isa() tells whether its a instance of given class', function() {
        expect(instance.isa('myClass')).to.be.ok;
        expect(instance.isa(myClass)).to.be.ok;

        expect(instance.isa('otherClass')).to.be.false;
        expect(instance.isa(otherClass)).to.be.false;
      });

    });

    describe('define class/instance specs', function() {
      
      describe('class', function() {

        var FilePath = ObjectB.Class.define(
          'FilePath', function(klass, instance) {

          klass.method({
            join: function(a, b) {
              return [a, b].join('/');
            },
            split: function(path) {
              return path.split("/");
            }
          });

          klass.attr({
            DELIMITER: '/',
            HOME_DIR: '/home/'
          });
        });

        it('class method', function() {
          expect(FilePath.join('usr', 'bin'))
            .to.equal('usr/bin');
          expect(FilePath.split('/tmp/test.txt'))
            .to.deep.equal(['', 'tmp', 'test.txt']);
        });

        it('class attributes', function() {
          expect(FilePath.DELIMITER).to.equal('/');
          expect(FilePath.HOME_DIR).to.equal('/home/');
        });

      });

      describe('instance', function() {
        var FilePath = ObjectB.Class.define(
          'FilePath', function(klass, instance) {
          instance.attr({
            filename: "test.txt",
            permission: 755
          });
        });

        it('creates instance accessor', function() {
          var path = new FilePath();
          expect(path.getFilename).to.be.ok;
          expect(path.setFilename).to.be.ok;
        });

        it('stores defaults', function() {
          var path = new FilePath();
          expect(path.getFilename()).to.equal("test.txt");
          expect(path.getPermission()).to.equal(755);
        });

        it('creates default setters/getters that work', function() {
          var path = new FilePath();
          expect(path.getFilename()).to.equal("test.txt");
          path.setFilename("fuga.txt");
          expect(path.getFilename()).to.equal("fuga.txt");
        });

      });

    });
  });

});
