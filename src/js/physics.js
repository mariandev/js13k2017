var Physics = new function() {
  var self = this;


  self._colliders = {};

  /**
   * @param {string} group
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @return {boolean}
   */
  self.AddCollider = function(group, x, y, w, h) {
    if(!self._colliders[group]) self._colliders[group] = [];

    self._colliders[group].push({
      x: x,
      y: y,
      w: w,
      h: h
    })
  };

  /**
   * @param {string} group
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @return {boolean}
   */
  self.CollidesWith = function(group, x, y, w, h) {
    if(!self._colliders[group]) return false;

    var colliders = self._colliders[group];

    for(var i = 0;i < colliders.length; i++) {
      var collider = colliders[i];
      if(self.Collide(
          collider.x,
          collider.y,
          collider.w,
          collider.h,
          x,
          y,
          w,
          h
      )) return true;
    }

    return false;
  };

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} w1
   * @param {number} h1
   * @param {number} x2
   * @param {number} y2
   * @param {number} w2
   * @param {number} h2
   * @return {boolean}
   */
  self.Collide = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      y1 + h1 > y2;
  }
};