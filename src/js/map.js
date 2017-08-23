var MAP = function() {
  var self = this;

  self.scalePerLayer = .2 / LayersCount; // .05

  self.rawMapData = [];
  self.mapData = [];
  self.mapWidth = 10;
  self.mapHeight = 10;

  self.layers = [];

  var tileTypes = {
    a: "wall",
    b: "floor",
    c: "column"
  };

  for(var y = 0;y < self.mapHeight; y++) {
    for(var x = 0;x < self.mapWidth; x++) {
      var r = "b";

      if(x === 0 || y === 0 || x === self.mapWidth - 1 || y === self.mapHeight - 1 ) r = "a";
      else if(Math.random() < 0.25) r = "c";

      self.rawMapData[y * self.mapWidth + x] = r;
    }
  }

  self.init = function() {
    self.realWidth = self.mapWidth * TILE_SIZE;
    self.realHeight = self.mapHeight * TILE_SIZE;

    self.decodeMap();

    var i = LayersCount; while(i--) self.renderLayer(i);
  };

  self.decodeMap = function() {
    self.mapData = self.rawMapData.map(function(tt) {
      return tileTypes[tt];
    });
  };

  self.renderLayer = function(layer) {

    var image = document.createElement("img"),
        canvas,
        ctx = (canvas = document.createElement("canvas")).getContext("2d");

    canvas.width = self.realWidth;
    canvas.height = self.realHeight;

    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;

    self.mapData.forEach(function(tile, i) {
      ctx.drawImage(
        Layers[tile][layer],
        Math.floor(i % self.mapWidth) * TILE_SIZE,
        Math.floor(i / self.mapWidth) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    });

    image.src = canvas.toDataURL();

    image.style.transform = "translateZ(0) scale(" + self.getLayerScale(layer) + ")";
    image.style.zIndex = layer;

    document.getElementById("map").appendChild(image);
    self.layers[layer] = image;

    //document.body.appendChild(self.mapCanvas);
  };

  self.getLayerScale = function(layer) {
    return 1 + self.scalePerLayer * layer;
  };

  self.offsetX = 0;
  self.offsetY = 0;
  self.offsetSpeed = 250;
  self.update = function (dt) {

    var s = self.offsetSpeed * dt;

    if(Keyboard.Keys[Keyboard.Key.Up] >= Keyboard.State.Pressed) self.offsetY += s;
    if(Keyboard.Keys[Keyboard.Key.Down] >= Keyboard.State.Pressed) self.offsetY -= s;
    if(Keyboard.Keys[Keyboard.Key.Left] >= Keyboard.State.Pressed) self.offsetX += s;
    if(Keyboard.Keys[Keyboard.Key.Right] >= Keyboard.State.Pressed) self.offsetX -= s;

    self.layers.forEach(function(layer, i) {
      var scale = self.getLayerScale(i);
      layer.style.left = (self.offsetX * scale + GAME_WIDTH / 2) + "px";
      layer.style.top = (self.offsetY * scale - GAME_HEIGHT / 2) + "px";
    });
  };

};