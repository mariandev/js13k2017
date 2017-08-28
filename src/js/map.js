var MAP = function() {
  var self = this;

  self.rawMapData = [];
  self.mapData = [];
  self.mapWidth = 31;
  self.mapHeight = 31;

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
      // else if(y === Math.floor(self.mapHeight / 2) && x === Math.floor(self.mapWidth / 2)) r = "c";
      else if(Math.random() < 0.05) r = "c";

      self.rawMapData[y * self.mapWidth + x] = r;
    }
  }

  self.init = function() {
    self.realWidth = self.mapWidth * TILE_SIZE;
    self.realHeight = self.mapHeight * TILE_SIZE;

    self.layerOffsetX = (GAME_WIDTH - self.realWidth) / 2;
    self.layerOffsetY = (GAME_HEIGHT - self.realHeight) / 2;

    self.decodeMap();

    var i = LayersCount; while(i--) self.renderLayer(i);
  };

  self.decodeMap = function() {
    self.mapData = self.rawMapData.map(function(tt) {
      return tileTypes[tt];
    });
  };

  self.renderLayer = function(layer) {

    var image = get("img"),
        canvas,
        ctx = (canvas = get("canvas")).getContext("2d");

    canvas.width = self.realWidth;
    canvas.height = self.realHeight;

    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;

    self.mapData.forEach(function(tile, i) {
      Layers[tile][layer] && ctx.drawImage(
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

    id("map").appendChild(image);
    self.layers[layer] = image;

    //document.body.appendChild(self.mapCanvas);
  };

  self.scaleBase = 3;
  self.scaleAdd = .5;
  self.getLayerScale = function(layer) {
    return self.scaleBase + Math.pow(self.scaleBase, 2) / 100 * layer;
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
    if(Keyboard.Keys[Keyboard.Key.R] >= Keyboard.State.Pressed) self.scaleBase += self.scaleAdd * dt;
    if(Keyboard.Keys[Keyboard.Key.F] >= Keyboard.State.Pressed) self.scaleBase -= self.scaleAdd * dt;

    /*console.clear();
    console.log(self.scalePerLayer);
    console.log(self.scaleBase);*/

    self.layers.forEach(function(layer, i) {
      var scale = self.getLayerScale(i);
      // var scale = clampLeft(self.getLayerScale(i), 1);
      var left = self.offsetX * scale + self.layerOffsetX;
      var top = self.offsetY * scale + self.layerOffsetY;

      layer.style.transform = "translate3d(" + left + "px, " + top + "px, 0) scale(" + scale + ")";
    });
  };

};