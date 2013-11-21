

//  Create Class
var File = ObjectB.Class.new('File', function() {

});

//  Class Attributes and Methods
var File = ObjectB.Class.new('File', function() {

  this.classAttr({
    DEFAULT_ENCODING: 'utf-8',
    DEFAULT_PATH_SEPARATOR: '/' 
  });

  this.classMethod({
    joinPath: function(a, b) {
      return [a, b].join(this.class.DEFAULT_PATH_SEPARATOR);
    }
  });

  this.initialize(function(path) {
    this.setPath(path);
  }

  this.instanceAttr({
    path    : null, // name => default value
    content : null,
    size    : null
  })

  this.instanceMethod({
    write : function(str) {
    },
    save : function() {
    }
  })

});

// Class attributes and mathods call
File.DEFAULT_PATH_SEPARATOR; // "utf-8"
File.joinPath(path, filename);

// Create instance
var file = new File(path);

// Setters and getters are created automatically.
// InstanceAttr "foo" generates getFoo(), setFoo(val)
file.getPath(); // === path
file.setContent(val);
file.getSize(); 

// Class detection
file.isa(File); // true
typeof text; // "File"
file instanceof File; // true

// Class extention (Inheritance)
var LogFile = File.extend('LogFile', function() {

  this.instanceAttr({
    date: null,
  });

  this.instanceMethod({
    rotate: function() {
    }
  });

});
var log_file = new LogFile(path);
log_file.isa(LogFile); // true
log_file.isa(File); // true
log_file.getDate(); // child method
log_file.rotate(); // child method
log_file.write(str); // parent method

// Implementation Mix-in
var Logger = ObjectB.Trait.new(function() {

  this.instanceAttr({
    buffer: []
  });

  this.instanceMethod({
    info: function(str) {},
    warn: function(str) {},
    error: function(str) {}
  });

});

var File = ObjectB.Class.new('File', function() {
  this.mixin(Logger);
});

var file = new File(path);
file.isa(Logger); // true
file.info(str);

// Before/After/Around trigger
var File = ObjectB.Class.new('File', function() {

  this.mixin(Logger);

  this.initialize(function(path) {
    this.setPath(path);
  }

  this.instanceAttr({
    path : null
  })

  this.instanceMethod({
    write : function(str) {
    },
    flush : function() {
    },
    save : function() {
    }
  });

  this.before('save', function(args) {
    this.flush();
  });

  this.after('write', function(args) {
    this.info(args[0]); // args is a arguments given to write()
  });

});

// global type assertion
function serialize(file) {
  _assertClass(file, File); // throw exception if file is not a File
}








