var CORE = function() {

  var self = this;

  self.canvases = {
    game: {canvas: null, ctx: null},
    ui: {canvas: null, ctx: null}
  };

  self.map = null;

  self.init = function() {
    self.initCanvases();
    self.initListeners();

    GFX.unpackGFX(function() {

      self.map = new MAP();
      self.map.init();

      self.loop();

    });
  };

  self.initCanvases = function() {
    Object.keys(self.canvases).forEach(function(canvasId) {
      var canvas = document.createElement("canvas");

      canvas.id = canvasId;
      canvas.webkitImageSmoothingEnabled = false;
      canvas.mozImageSmoothingEnabled = false;
      canvas.imageSmoothingEnabled = false;

      document.body.appendChild(canvas);

      self.canvases[canvasId].ctx = (self.canvases[canvasId].canvas = canvas).getContext("2d");
    });

    var resizeFn = function() {
      Object.keys(self.canvases).forEach(function(canvas) {
        self.canvases[canvas].canvas.width = GAME_WIDTH;
        self.canvases[canvas].canvas.height = GAME_HEIGHT;
      });
    };

    resizeFn();
    window.addEventListener("resize", resizeFn);
  };

  self.x = 0;
  self.y = 0;
  self.speed = 5;

  self.initListeners = function() {
    document.addEventListener("keydown", function(e) {
      switch(e.which) {
        case 87: //w
          self.y -= self.speed;
          break;
        case 65: //a
          self.x -= self.speed;
          break;
        case 83: //s
          self.y += self.speed;
          break;
        case 68: //d
          self.x += self.speed;
          break;
      }
    });
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
  self.update = function(dt) {};
  self.render = function() {
    Object.keys(self.canvases).forEach(function(canvasId) {
      self.canvases[canvasId].ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    });

    self.map.renderMapAt(self.canvases.game.ctx, self.x, self.y);
  };

};

var core;

window.addEventListener("load", function() {
  core = new CORE();
  core.init();
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();