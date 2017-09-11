var Camera = new function() {
  var self = this;

  self.position = new Point(GAME_WIDTH / 2, GAME_HEIGHT / 2);

  self.zoom = 800;

  /**
   * @return {void}
   * */
  self.update = function() {
    if(!self._entity) return;

    self.position.x = GAME_WIDTH / 2 - self._entity.position.x;
    self.position.y = GAME_HEIGHT / 2 - self._entity.position.y;
  };

  /**
   * @private
   * @type {Entity}
   */
  self._entity = null;

  /**
   * @param {Entity} entity
   * @return {void}
   * */
  self.follow = function(entity) {
    self._entity = entity;
  };
};