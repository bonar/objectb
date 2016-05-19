
var ObjectB = {};

ObjectB.ClassSpec = function(konstructor) {
  this.constructor = konstructor;
};
ObjectB.ClassSpec.prototype = {

  method: function(param) {
    var self = this;
    eachKV(param, function(key, val) {
      self.constructor[key] = val;
    });
  },

  attr: function(param) {
    var self = this;
    eachKV(param, function(key, val) {
      self.constructor[key] = val;
    });
  }
}

ObjectB.InstanceSpec = function(konstructor) {
  this.constructor = konstructor;
};
ObjectB.InstanceSpec.prototype = {

  method: function(param) {
    eachKV(param, function(key, val) {
      this.constructor.prototype[key] = val
    });
  },

  attr: function(param) {
    eachKV(param, function(key, defaultVal) {
      var accessorKey = ucfirst(key);
      constructor.prototype["set" + accessorKey] = function(v) {
        this[key] = v;
        return v;
      };
      constructor.prototype["get" + accessorKey] = function() {
        if (this.hasOwnProperty(key)) {
          return this[key];
        } else {
          return defaultVal;
        }
      };
    });
  }

}

ObjectB.Class = {

  createDefaultConstructor: function(name) {
    var constructor = function() {
      this._initialize(arguments);
    };
    constructor.__name      = name;
    constructor.__parents   = ['Object'];
    constructor.__abilities = [];

    constructor.getName = function() {
      return this.__name;
    };

    constructor.isa = function(klass) {
      if (!klass) {
        return false;
      }
      var klassName = isFunction(klass.getName) ?
        klass.getName() : klass.toString();

      if (name === klassName) {
        return true;
      }
      // search parent arrays
      for (var parentName in constructor.__parents) {
        if (parentName === klassName) {
          return true;
        }
      }
      return false;
    };
    
    constructor.prototype.isa = function(klass) {
      return this.constructor.isa(klass);
    };
    constructor.prototype._initialize = function() {};
      
    return constructor;
  },

  define: function(name, builder) {
    var constructor  = ObjectB.Class.createDefaultConstructor(name);
    var classSpec    = new ObjectB.ClassSpec(constructor);
    var instanceSpec = new ObjectB.InstanceSpec(constructor)
    builder.call(this, classSpec, instanceSpec);
    return constructor;
  }

};

function ucfirst(str) {
  var length = str.length;
  if (0 === length) {
    return "";
  } else if (1 === length) {
    return str.toUpperCase();
  }
  var first = str.charAt(0);
  var rest  = str.slice(1);
  return first.toUpperCase() + rest;
}

function is(obj, constructorName) {
  return !!(obj && constructorName === (obj.constructor.name));
}

function isObject(obj) {
  return is(obj, 'Object');
}

function isFunction(obj) {
  return is(obj, 'Function');
}

function eachKV(obj, fn) {
  if (!isObject(obj)) {
    return;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(obj, key, obj[key]);
    }
  }
  return obj;
}

function extend(dst, src) {
  eachKV(src, function(key, val) {
    dst[key] = val;
  });
  return dst;
}

module.exports = {
  ucfirst: ucfirst,
  isObject: isObject,
  eachKV: eachKV,
  extend: extend,

  Spec: ObjectB.Spec,
  Class: ObjectB.Class
};


