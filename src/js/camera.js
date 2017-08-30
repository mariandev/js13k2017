var Camera = new function() {
  var self = this;

  self.position = Point.zero();
  self.speed = 150;
  self.left = Point.left();
  self.down = Point.down();

  self.zoom = 800;
  self.zoomAdd = 250;

  /**
   * @param {number} dt
   * */
  self.update = function(dt) {
    var s = self.speed * dt;

    if(Keyboard.Keys[Keyboard.Key.Up] >= Keyboard.State.Pressed)    self.position = self.position.add(self.down.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Down] >= Keyboard.State.Pressed)  self.position = self.position.sub(self.down.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Left] >= Keyboard.State.Pressed)  self.position = self.position.add(self.left.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Right] >= Keyboard.State.Pressed) self.position = self.position.sub(self.left.mul(s));
    if(Keyboard.Keys[Keyboard.Key.R] >= Keyboard.State.Pressed) self.zoom += self.zoomAdd * dt;
    if(Keyboard.Keys[Keyboard.Key.F] >= Keyboard.State.Pressed) self.zoom -= self.zoomAdd * dt;
  };
};