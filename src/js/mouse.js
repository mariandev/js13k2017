var Mouse = new function() {
  var self = this;

  self.position = Point.zero();
  self.positionFromCenter = Point.zero();

  self.init = function() {
    Core.container.addEventListener("mousemove", self.onMouseMove);
  };

  self.onMouseMove = function(evt) {
    self.position.x = evt.pageX;
    self.position.y = evt.pageY;

    self.positionFromCenter.x = self.position.x - GAME_WIDTH  / 2;
    self.positionFromCenter.y = self.position.y - GAME_HEIGHT / 2;
  };
};