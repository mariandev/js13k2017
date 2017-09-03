/**
 * @param {number} x
 * @param {number} y
 * */
function Point(x, y) {
  var self = this;

  self.x = x;
  self.y = y;

  /**
   * @param {number} amt
   * @return Point
   * */
  self.mul = function(amt) {
    return new Point(self.x * amt, self.y * amt);
  };

  /**
   * @param {Point} min
   * @param {Point} max
   * @return Point
   * */
  self.clamp = function(min, max) {
    return new Point(clamp(self.x, min.x, max.x), clamp(self.y, min.y, max.y));
  };

  /**
   * @param {Point} other
   * @return Point
   * */
  self.add = function(other) {
    return new Point(self.x + other.x, self.y + other.y);
  };

  /**
   * @param {Point} other
   * @return Point
   * */
  self.sub = function(other) {
    return new Point(self.x - other.x, self.y - other.y);
  };

  /**
   * @param {Point} other
   * @return Point
   * */
  self.flat = function(other) {
    return new Point(self.x * other.x, self.y * other.y);
  }
}

Point.zero = function() { return new Point(0, 0) };
Point.one  = function() { return new Point(1, 1) };
Point.left  = function() { return new Point(1, 0) };
Point.down  = function() { return new Point(0, 1) };