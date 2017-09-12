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
  };

  /**
   * @return {number}
   * */
  self.angle = function() {
    return Math.atan2(self.y, self.x);
  };

  /**
   * @return Point
   * */
  self.clone = function() {
    return new Point(self.x, self.y);
  };
}

Point.zero = function() { return Point.from(0) };
Point.one  = function() { return Point.from(1) };
Point.left  = function() { return new Point(1, 0) };
Point.down  = function() { return new Point(0, 1) };

/**
 * @static
 * @param {number} x
 * @param {number} [y]
 * @return {Point}
 * */
Point.from = function (x, y) {
  return new Point(x, typeof y === "undefined" ? x : y);
};