Math.sign = Math.sign || function(x) {
  return ((x > 0) - (x < 0)) || +x;
};

Object.prototype.isIn = function(array) {
  return array.indexOf(this.valueOf()) > -1;
};

Object.prototype.startWith = function(search) {
  return this.indexOf(search) === 0;
};

Object.prototype.endWith = function(search) {
  return this.indexOf(search) === (this.length - search.length);
};

Object.prototype.map = function(callback) {
  for (let key in this) {
    if (this.hasOwnProperty(key)) {
      let newValue = callback(this[key], key, this);
      if ([undefined, null].indexOf(newValue) === -1) {
        this[key] = newValue;
      }
    }
  }
  return this;
};

Array.prototype.has = function(item) {
  return this.indexOf(item) > -1;
}

Array.prototype.insert = function(item, index) {
  index = index === undefined || index < 0 || index > this.length ? this.length : index;
  this.splice(index, 0, item);
  return this;
}

Array.prototype.remove = function(item) {
  let index = this.indexOf(item);
  index > -1 && this.splice(index, 1);
  return this;
}

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
  const sort = (sign, callback) => this.sort((a, b) => Math.sign(callback(a) - callback(b)) * sign);
  return {
    asc: sort.bind(this, 1, callback),
    desc: sort.bind(this, -1, callback)
  }
};

Array.prototype.groupBy = function(callback) {
  let helper = {};
  let response = [];
  this.map((value, key, array) => {
    let id = callback(value);
    if (!helper[id]) {
      helper[id] = response.length;
      response.push([]);
    }
    response[helper[id]].push(value);
  });
  return response;
};

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; --i){
    const j = Math.floor(Math.random() * i);
    const temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
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
