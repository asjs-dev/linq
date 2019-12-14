Object.prototype.isIn = function(array) {
  return array.indexOf(this.valueOf()) > -1;
};

Object.prototype.startWith = function(search) {
  return this.indexOf(search) === 0;
};

Object.prototype.endWith = function(search) {
  return this.indexOf(search) === (this.length - search.length);
};

Array.prototype.map = function(callback) {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var newValue = callback(this[key], key, this);
      if ([undefined, null].indexOf(newValue) === -1) {
        this[key] = newValue;
      }
    }
  }
  return this;
};

Array.prototype.reduce = function(callback, startValue) {
  let accumulator = startValue || 0;
  this.map((value, key, array) => {
    accumulator = callback(accumulator, this[key]);
  });
  return accumulator;
};

Array.prototype.select = function(callback) {
  let response = [];
  this.map((value, key, array) => {
    response.push(callback(value));
  });
  return response;
};

Array.prototype.offset = function(value) {
  value = Math.min(this.length - 1, Math.max(0, parseInt(value) || 0));
  return this.slice(value);
};

Array.prototype.limit = function(value) {
  value = Math.min(this.length, Math.max(1, parseInt(value) || 1));
  return this.slice(0, value);
};

Array.prototype.where = function(callback) {
  let response = [];
  this.map((value, key, array) => {
    callback(value) && response.push(value);
  });
  return response;
};

Array.prototype.orderBy = function(callback) {
  function sort(sign, callback) {
    return this.sort((a, b) => {
      const aValue = callback(a);
      const bValue = callback(b);

      if (aValue > bValue) return sign;
      if (aValue < bValue) return -sign;
      return 0;
    });
  };
  
  return {
    asc: sort.bind(this, 1, callback),
    desc: sort.bind(this, -1, callback)
  }
};

Array.prototype.groupBy = function(callback) {
  let helper = {};
  let response = [];
  this.map((value, key, array) => {
    var id = callback(value);
    if (!helper[id]) {
      helper[id] = response.length;
      response.push([]);
    }
    response[helper[id]].push(value);
  });
  return response;
};

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

String.prototype.isLike = function(search) {
  return this.indexOf(search) > -1;
};
