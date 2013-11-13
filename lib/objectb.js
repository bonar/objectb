
(function() {

ObjectB = { // Utiliy functions

  is: function(obj, constructorName) {
    return (obj && constructorName === (obj.constructor.name));
  },

  isObject: function(obj) {
    return ObjectB.is(obj, 'Object');
  },

  eachKV: function(obj, fn) {
    if (!ObjectB.isObject(obj)) {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(obj, key, obj[key]);
      }
    }
    return obj;
  },

  extend: function(dst, src) {
    ObjectB.eachKV(src, function(key, val) {
      dst[key] = val;
    });
    return dst;
  }

};

ObjectB.Spec = function() {
  this._constructor     = function() {};
  this._classMethod     = {};
  this._classAttr       = {};
  this._instanceMethod  = {};
  this._instanceAttr    = {};
};
ObjectB.Spec.prototype = {

  _access: function(key, param) {
    var propName = '_' + key;
    // getter access
    if (!param) { 
        return this[propName];
    }
    // setter access
    if (ObjectB.isObject(this[propName])) {
      ObjectB.extend(this[propName], param);
    } else {
      this[propName] = param;
    }
  },

  classMethod: function(param) {
    return this._access('classMethod', param);
  },

  classAttr: function(param) {
    return this._access('classAttr', param);
  },

  instanceMethod: function(param) {
    return this._access('instanceMethod', param);
  },

  instanceAttr: function(param) {
    return this._access('instanceAttr', param);
  }

};

ObjectB.Class = {

  "new": function(name, builder) {

  }

};


})();

