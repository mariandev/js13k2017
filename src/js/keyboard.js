Keyboard = {};

Keyboard.State = {};
Keyboard.State.Up = 0;
Keyboard.State.Pressed = 1;
Keyboard.State.Down = 2;


Keyboard.Key = {};
Keyboard.Key.Up    = 87;
Keyboard.Key.Left  = 65;
Keyboard.Key.Down  = 83;
Keyboard.Key.Right = 68;
Keyboard.Key.R     = 82;
Keyboard.Key.F     = 70;

Keyboard.Keys = {};

Keyboard._keydown = function(evt) {
  var key = evt.which;

  if(!Keyboard.Keys[key] && Keyboard.Keys[key] !== Keyboard.State.Up) Keyboard.Keys[key] = Keyboard.State.Up;
  if(Keyboard.Keys[key] === Keyboard.State.Pressed) Keyboard.Keys[key] = Keyboard.State.Down;
  if(Keyboard.Keys[key] === Keyboard.State.Up) Keyboard.Keys[key] = Keyboard.State.Pressed;
};

Keyboard._keyup = function(evt) {
  var key = evt.which;
  Keyboard.Keys[key] = Keyboard.State.Up;
};

Keyboard.init = function() {
  document.body.addEventListener("keydown", Keyboard._keydown);
  document.body.addEventListener("keyup", Keyboard._keyup);
};