
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

    describe('applying spec', function() {
      
      it('class method', function() {
        var FilePath = ObjectB.Class.define('FilePath', function() {
          this.classMethod({
            join: function(a, b) {
              return [a, b].join('/');
            },
            split: function(path) {
              return path.split("/");
            }
          });
        });
        expect(FilePath.join('usr', 'bin'))
          .toEqual('usr/bin');
        expect(FilePath.split('/tmp/test.txt'))
          .toEqual(['', 'tmp', 'test.txt']);
      });

      it('class attributes', function() {
        var FilePath = ObjectB.Class.define('FilePath', function() {
          this.classAttr({
            DELIMITER: '/',
            HOME_DIR: '/home/'
          });
        });
        expect(FilePath.DELIMITER).toEqual('/');
        expect(FilePath.HOME_DIR).toEqual('/home/');
      });

      describe('instance', function() {
        var FilePath = ObjectB.Class.define('FilePath', function() {
          this.instanceAttr({
            filename: "test.txt",
            permission: 755
          });
        });

        it('creates instance accessor', function() {
          var path = new FilePath();
          expect(path.getFilename).toBeTruthy();
          expect(path.setFilename).toBeTruthy();
        });

        it('stores defaults', function() {
          var path = new FilePath();
          expect(path.getFilename()).toEqual("test.txt");
          expect(path.getPermission()).toEqual(755);
        });

        it('creates default setters/getters that work', function() {
          var path = new FilePath();
          expect(path.getFilename()).toEqual("test.txt");
          path.setFilename("fuga.txt");
          expect(path.getFilename()).toEqual("fuga.txt");
        });

      });

    });

  });

});
