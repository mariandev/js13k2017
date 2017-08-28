var Camera = new function() {
  var self = this;

  self.position = Point.zero();
  self.speed = 250;
  self.left = Point.left();
  self.down = Point.down();

  self.scaleBase = 3;
  self.scaleAdd = .5;

  /**
   * @param {number} dt
   * */
  self.update = function(dt) {
    var s = self.speed * dt;

    if(Keyboard.Keys[Keyboard.Key.Up] >= Keyboard.State.Pressed) self.position = self.position.add(self.down.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Down] >= Keyboard.State.Pressed) self.position = self.position.sub(self.down.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Left] >= Keyboard.State.Pressed) self.position = self.position.add(self.left.mul(s));
    if(Keyboard.Keys[Keyboard.Key.Right] >= Keyboard.State.Pressed) self.position = self.position.sub(self.left.mul(s));
    if(Keyboard.Keys[Keyboard.Key.R] >= Keyboard.State.Pressed) self.scaleBase += self.scaleAdd * dt;
    if(Keyboard.Keys[Keyboard.Key.F] >= Keyboard.State.Pressed) self.scaleBase -= self.scaleAdd * dt;
  };
}