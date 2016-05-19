objectb
=======

# Overview

objectb is a lightweight class builder(like Class.create in prototype.js).

# Usage

    var ObjectB = require('objectb');

    // define and create new class constructor
    var File = ObjectB.Class.define('File', function(class, instance) {
    
      class.attr({
        DEFAULT_ENCODING: 'utf-8',
        DEFAULT_PATH_SEPARATOR: '/'
      });
      
      class.method({
        joinPath: function(a, b) {
          return [a, b].join(this.class.DEFAULT_PATH_SEPARATOR);
        }
      });
      
      instance.initialize(function(path) {
        this.setPath(path);
      }

      instance.attr({
        path    : null, // name => default value
        content : null,
        size    : null
      })

      instance.method({
        write: function(str) {
          // .....
        },
        save: function() {
          // .....
        }
      });
    
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

# ToDo

* extend class
* implementation mixin

# Install

    npm install objectb

# Running test

    npm test

# LICENSE

BSD-2-Clause




