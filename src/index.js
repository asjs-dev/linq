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
  for (var key in this) this.hasOwnProperty(key) && callback(key, this[key]);
  return this;
};

Array.prototype.reduce = function(callback, startValue) {
  let accumulator = startValue || 0;
  this.map((key, value) => accumulator = callback(accumulator, this[key]));
  return accumulator;
};

Array.prototype.select = function(callback) {
  let response = [];
  this.map((key, value) => response.push(callback(value)));
  return response;
};

Array.prototype.limit = function(from, limit) {
  let response = [];
  from = from || 0;
  limit = limit || this.length;
  this.map((key, value) => key + 1 >= from && response.length < limit && response.push(value));
  return response;
};

Array.prototype.where = function(callback) {
  let response = [];
  this.map((key, value) => callback(value) && response.push(value));
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
  this.map((key, value) => {
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
