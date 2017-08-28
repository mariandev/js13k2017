/**
 * @param {number} x
 * @param {number} y
 * */
function Point(x, y) {
  var self = this;

  self.x = x;
  self.y = y;

  self.mul = function(amt) {
    return new Point(self.x * amt, self.y * amt);
  };

  self.add = function(other) {
    return new Point(self.x + other.x, self.y + other.y);
  };

  self.sub = function(other) {
    return new Point(self.x - other.x, self.y - other.y);
  };
}

Point.zero = function() { return new Point(0, 0) };
Point.one  = function() { return new Point(1, 1) };
Point.left  = function() { return new Point(1, 0) };
Point.down  = function() { return new Point(0, 1) };