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
      else if((x % 2 !== y % 2)) r = "c";

      self.rawMapData[y * self.mapWidth + x] = r;
    }
  }

  self.init = function() {
    self.realWidth = self.mapWidth * TILE_SIZE;
    self.realHeight = self.mapHeight * TILE_SIZE;

    self.layerOffsetX = (GAME_WIDTH - self.realWidth) / 2;
    self.layerOffsetY = (GAME_HEIGHT - self.realHeight) / 2;

    self.layersHolder = id("map");

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

    image.style.transform = "translateZ(" + (layer * 10) + "px)";
    image.style.zIndex = layer;

    id("map").appendChild(image);
    self.layers[layer] = image;
  };

  self.update = function (dt) {
    self.layersHolder.style.transform = "translate3d(" + Camera.position.x + "px, " + Camera.position.y + "px, " + Camera.zoom + "px)";
  };

};