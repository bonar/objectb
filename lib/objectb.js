
(function() {

ObjectB = {};

ObjectB.Spec = function() {
  this._classMethd      = null;
  this._classAttr       = null;
  this._instanceMethod  = null;
  this._instanceAttr    = null;
};
ObjectB.Spec.prototype = {

  classMethod: function(param) {
  },

  classAttr: function(param) {
  },

  instanceMethod: function(param) {
  },

  instanceAttr: function(param) {
  }

};

ObjectB.Class = {

  "new": function(name, builder) {

  }

};


})();

