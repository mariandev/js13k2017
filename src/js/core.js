var Core = new function() {

  var self = this;

  self.canvases = {
    entities: {canvas: null, ctx: null},
    ui: {canvas: null, ctx: null}
  };

  self.container = null;

  self.init = function() {
    self.initCanvases();

    GFX.unpackGFX(function() {

      Keyboard.init();
      Mouse.init();

      LayersCreator.init(function() {
        Map.init();
        self.loop();
      });
    });
  };

  self.initCanvases = function() {
    self.container = id("game");

    Object.keys(self.canvases).forEach(function(canvasId) {
      var canvas = get("canvas");

      canvas.id = canvasId;
      canvas.webkitImageSmoothingEnabled = false;
      canvas.mozImageSmoothingEnabled = false;
      canvas.imageSmoothingEnabled = false;

      self.container.appendChild(canvas);

      self.canvases[canvasId].ctx = (self.canvases[canvasId].canvas = canvas).getContext("2d");
    });

    var resizeFn = function() {
      Object.keys(self.canvases).forEach(function(canvas) {
        self.canvases[canvas].canvas.width = GAME_WIDTH;
        self.canvases[canvas].canvas.height = GAME_HEIGHT;
      });

      self.container.style.width = GAME_WIDTH + "px";
      self.container.style.height = GAME_HEIGHT + "px";
    };

    resizeFn();
    window.addEventListener("resize", resizeFn);
  };

  self.lsts = null;
  self.loop = function() {
    window.requestAnimFrame(self.loop);

    var ts = Date.now();
    if(!self.lsts) self.lsts = ts;
    var dt = (ts - self.lsts) / 1000;
    self.lsts = ts;

    self.update(dt);
    self.render(dt);

  };
  self.update = function(dt) {
    Camera.update(dt);
    Map.update(dt);
  };
  self.render = function() {
    Object.keys(self.canvases).forEach(function(canvasId) {
      self.canvases[canvasId].ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    });
  };

};

window.addEventListener("load", function() {
  Core.init();
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();